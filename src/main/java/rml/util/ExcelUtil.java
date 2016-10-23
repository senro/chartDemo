package rml.util;

import org.apache.poi.hssf.usermodel.*;
import rml.model.Data;
import rml.model.DrugRecord;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class ExcelUtil {

    //每个sheet最多显示60000条数据
    private static final int SHEET_LENGTH = 60000;

    public static void exportExcel(String title, String[] headers, List<String[]> dataList, OutputStream out) throws Exception {
        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet(title);
        sheet.setDefaultColumnWidth(15);

        HSSFCellStyle style = workbook.createCellStyle();
        HSSFFont font = workbook.createFont();
        font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
        style.setFont(font);

        //表头
        HSSFRow row = sheet.createRow(0);
        for (int i = 0; i < headers.length; i++) {
            HSSFCell cell = row.createCell(i);
            cell.setCellStyle(style);
            HSSFRichTextString text = new HSSFRichTextString(headers[i]);
            cell.setCellValue(text);

        }

        //表体数据
        for (int j = 0; j < dataList.size(); j++) {
            row = sheet.createRow(j + 1);

            String[] data = dataList.get(j);

            for (int k = 0; k < headers.length; k++) {
                HSSFCell cell = row.createCell(k);

                HSSFRichTextString text = new HSSFRichTextString(data[k]);
                cell.setCellValue(text);
            }
        }

        //自动调整宽度
        for (int i = 0; i < headers.length; i++) {
            sheet.autoSizeColumn(i, true);
        }

        workbook.write(out);

    }

    //导出多个sheet 的excel 文件
    public static void exportExcelWithMoreSheet(String title, String[] headers, List<String[]> dataList, OutputStream out) throws Exception {
        HSSFWorkbook workbook = new HSSFWorkbook();

        int dataLength = dataList.size();
        int sheetNum = dataLength / SHEET_LENGTH;
        for (int kk = 0; kk <= sheetNum && kk < 3; kk++) {

            HSSFSheet sheet = workbook.createSheet(title + (kk + 1));
            sheet.setDefaultColumnWidth(15);

            HSSFCellStyle style = workbook.createCellStyle();
            HSSFFont font = workbook.createFont();
            font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
            style.setFont(font);

            //表头
            HSSFRow row = sheet.createRow(0);
            for (int i = 0; i < headers.length; i++) {
                HSSFCell cell = row.createCell(i);
                cell.setCellStyle(style);
                HSSFRichTextString text = new HSSFRichTextString(headers[i]);
                cell.setCellValue(text);

            }

            //表体数据
            for (int j = kk * SHEET_LENGTH; j < dataLength && j < (kk + 1) * SHEET_LENGTH; j++) {
                row = sheet.createRow(j + 1 - (kk * SHEET_LENGTH));

                String[] data = dataList.get(j);

                for (int k = 0; k < headers.length; k++) {
                    HSSFCell cell = row.createCell(k);

                    HSSFRichTextString text = new HSSFRichTextString(data[k]);
                    cell.setCellValue(text);
                }
            }

            //自动调整宽度
            for (int i = 0; i < headers.length; i++) {
                sheet.autoSizeColumn(i, true);
            }
        }
        workbook.write(out);

    }

    /**
     * read the Excel file
     *
     * @param path the path of the Excel file
     * @return
     * @throws IOException
     */
    public class Common {

        public static final String OFFICE_EXCEL_2003_POSTFIX = "xls";
        public static final String OFFICE_EXCEL_2010_POSTFIX = "xlsx";

        public static final String EMPTY = "";
        public static final String POINT = ".";
        public static final String LIB_PATH = "lib";
        public static final String STUDENT_INFO_XLS_PATH = LIB_PATH + "/student_info" + POINT + OFFICE_EXCEL_2003_POSTFIX;
        public static final String STUDENT_INFO_XLSX_PATH = LIB_PATH + "/student_info" + POINT + OFFICE_EXCEL_2010_POSTFIX;
        public static final String NOT_EXCEL_FILE = " : Not the Excel file!";
        public static final String PROCESSING = "Processing...";

    }

    public List<DrugRecord> readExcel(Data data) throws IOException {
        String path=data.getDataPath();

        if (path == null || Common.EMPTY.equals(path)) {
            return null;
        } else {
            String postfix = getPostfix(path);
            if (!Common.EMPTY.equals(postfix)) {
                if (Common.OFFICE_EXCEL_2003_POSTFIX.equals(postfix)) {
                    return readXls(data);
                } else if (Common.OFFICE_EXCEL_2010_POSTFIX.equals(postfix)) {
                    return readXlsx(data);
                }
            } else {
                System.out.println(path + Common.NOT_EXCEL_FILE);
            }
        }
        return null;
    }

    /**
     * Read the Excel 2010
     *
     * @param path the path of the excel file
     * @return
     * @throws IOException
     */
    public List<DrugRecord> readXlsx(Data data) throws IOException {
        String path=data.getDataPath();
        System.out.println(Common.PROCESSING + path);
        InputStream is = new FileInputStream(path);
        XSSFWorkbook xssfWorkbook = new XSSFWorkbook(is);
        DrugRecord drugRecord = null;
        List<DrugRecord> list = new ArrayList<DrugRecord>();
        // Read the Sheet
        for (int numSheet = 0; numSheet < xssfWorkbook.getNumberOfSheets(); numSheet++) {
            XSSFSheet xssfSheet = xssfWorkbook.getSheetAt(numSheet);
            if (xssfSheet == null) {
                continue;
            }
            // Read the Row
            for (int rowNum = 4; rowNum <= xssfSheet.getLastRowNum(); rowNum++) {
                XSSFRow xssfRow = xssfSheet.getRow(rowNum);
                if (xssfRow != null) {
                    drugRecord = new DrugRecord();
                    XSSFCell drugName = xssfRow.getCell(1);
                    XSSFCell drugSpec = xssfRow.getCell(2);
                    XSSFCell drugUnit = xssfRow.getCell(3);
                    XSSFCell drugFactory = xssfRow.getCell(4);

                    XSSFCell price = xssfRow.getCell(5);
                    XSSFCell sale = xssfRow.getCell(6);

                    drugRecord.setUserId(data.getUserId());
                    drugRecord.setHospitalName(data.getHospitalName());
                    drugRecord.setMonth(data.getMonth());

                    drugRecord.setDrugType(String.valueOf(numSheet));
                    drugRecord.setDrugName(getValue(drugName));
                    drugRecord.setDrugSpec(getValue(drugSpec));
                    drugRecord.setDrugUnit(getValue(drugUnit));
                    drugRecord.setDrugFactory(getValue(drugFactory));
                    if(sale!=null){
                        drugRecord.setSale(getValue(sale));
                    }else{
                        drugRecord.setSale("");
                    }
                    if(price!=null) {
                        drugRecord.setPrice(getValue(price));
                    }else{
                        drugRecord.setPrice("");
                    }

                    list.add(drugRecord);
                }
            }
        }
        return list;
    }

    /**
     * Read the Excel 2003-2007
     *
     * @param path the path of the Excel
     * @return
     * @throws IOException
     */
    public List<DrugRecord> readXls(Data data) throws IOException {
        String path=data.getDataPath();
        System.out.println(Common.PROCESSING + path);
        InputStream is = new FileInputStream(path);
        HSSFWorkbook hssfWorkbook = new HSSFWorkbook(is);
        DrugRecord drugRecord = null;
        List<DrugRecord> list = new ArrayList<DrugRecord>();
        // Read the Sheet
        for (int numSheet = 0; numSheet < hssfWorkbook.getNumberOfSheets(); numSheet++) {
            HSSFSheet hssfSheet = hssfWorkbook.getSheetAt(numSheet);
            if (hssfSheet == null) {
                continue;
            }
            // Read the Row
            for (int rowNum = 4; rowNum <= hssfSheet.getLastRowNum(); rowNum++) {
                HSSFRow hssfRow = hssfSheet.getRow(rowNum);
                if (hssfRow != null && hssfRow.getCell(1)!=null) {
                    drugRecord = new DrugRecord();

                    HSSFCell drugName = hssfRow.getCell(1);
                    HSSFCell drugSpec = hssfRow.getCell(2);
                    HSSFCell drugUnit = hssfRow.getCell(3);
                    HSSFCell drugFactory = hssfRow.getCell(4);
                    HSSFCell price = hssfRow.getCell(5);
                    HSSFCell sale = hssfRow.getCell(6);

                    drugRecord.setUserId(data.getUserId());
                    drugRecord.setHospitalName(data.getHospitalName());
                    drugRecord.setMonth(data.getMonth());

                    drugRecord.setDrugType(String.valueOf(numSheet));
                    drugRecord.setDrugName(getValue(drugName));
                    drugRecord.setDrugSpec(getValue(drugSpec));
                    drugRecord.setDrugUnit(getValue(drugUnit));
                    drugRecord.setDrugFactory(getValue(drugFactory));

                    if(sale!=null){
                        drugRecord.setSale(getValue(sale));
                    }else{
                        drugRecord.setSale("");
                    }
                    if(price!=null) {
                        drugRecord.setPrice(getValue(price));
                    }else{
                        drugRecord.setPrice("");
                    }

                    list.add(drugRecord);
                }
            }
        }

        return list;
    }

    @SuppressWarnings("static-access")
    private String getValue(XSSFCell xssfRow) {
        if (xssfRow.getCellType() == xssfRow.CELL_TYPE_BOOLEAN) {
            return String.valueOf(xssfRow.getBooleanCellValue());
        } else if (xssfRow.getCellType() == xssfRow.CELL_TYPE_NUMERIC) {
            return String.valueOf(xssfRow.getNumericCellValue());
        } else {
            return String.valueOf(xssfRow.getStringCellValue());
        }
    }

    @SuppressWarnings("static-access")
    private String getValue(HSSFCell hssfCell) {
        if (hssfCell.getCellType() == hssfCell.CELL_TYPE_BOOLEAN) {
            return String.valueOf(hssfCell.getBooleanCellValue());
        } else if (hssfCell.getCellType() == hssfCell.CELL_TYPE_NUMERIC) {
            return String.valueOf(hssfCell.getNumericCellValue());
        } else {
            return String.valueOf(hssfCell.getStringCellValue());
        }
    }

    /**
     *       * get postfix of the path
     *       * @param path
     *       * @return
     *
     */
    public static String getPostfix(String path) {
        if (path == null || Common.EMPTY.equals(path.trim())) {
            return Common.EMPTY;
        }
        if (path.contains(Common.POINT)) {
            return path.substring(path.lastIndexOf(Common.POINT) + 1, path.length());
        }
        return Common.EMPTY;
    }
}
