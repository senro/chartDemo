/**
 * jQuery pagination plugin v1.1.2
 * http://esimakin.github.io/twbs-pagination/
 *
 * Copyright 2014, Eugene Simakin
 * Released under Apache 2.0 license
 * http://apache.org/licenses/LICENSE-2.0.html
 */
'use strict';

var old = $.fn.pagination;

// PROTOTYPE AND CONSTRUCTOR

var Pagination = function (element, options) {
    this.$element = $(element);
    this.options = $.extend({}, $.fn.pagination.defaults, options);
    this.$element_info=$(this.options.infoContainer);
    this.init(this.options);
};

Pagination.prototype = {

    constructor: Pagination,

    init: function (options) {
        var that=this;
        this.options = $.extend({}, this.options, options);

        this.$element.show();

        this.options.totalPages = Math.ceil(this.options.totalSize / this.options.pageSize);

        try {
            if (this.options.startPage < 1 || this.options.startPage > this.options.totalPages) {
                throw new Error('Start page option is incorrect');
            }

            if (this.options.totalPages <= 0) {
                throw new Error('Total pages option cannot be less 1 (one)!');
            }
        } catch (e) {
            this.$element.hide();
            this.$element_info.find('.'+this.options.paginationInfoClass).hide();
            return;
        }

        this.destroy();

        if (this.options.totalPages < this.options.visiblePages) {
            this.options.visiblePages = this.options.totalPages;
        }

        if (this.options.onPageClick instanceof Function) {
            this.$element.first().bind('page', this.options.onPageClick);
        }

        if (this.options.onGoToPageClick instanceof Function) {
            var base=this;
            this.$element_info.find('.info-goToPage').bind('goToPage', this.options.onGoToPageClick);

        }

        var tagName = (typeof this.$element.prop === 'function') ?
            this.$element.prop('tagName') : this.$element.attr('tagName');

        if (tagName === 'UL') {
            this.$listContainer = this.$element;
        } else {
            this.$listContainer = $('<ul></ul>');
        }

        this.$listContainer.addClass(this.options.paginationClass);

        if (tagName !== 'UL') {
            this.$element.append(this.$listContainer);
        }
        //
        //[
        //    '<div>共有',
        //    '<strong class="info-total-size"></strong>条记录，',
        //    '当前为<strong><span class="info-current-size"></span>-',
        //    '<span class="info-end-size"></span></strong>',
        //    '</div>'
        //].join('')
        if (this.options.info && this.options.totalPages>0) {
            this.$infoContainer = $(this.options.paginationInfoTpl);
            this.$infoContainer.addClass(this.options.paginationInfoClass);
            this.$element_info.find('.'+this.options.paginationInfoClass).remove();
            this.$element_info.append(this.$infoContainer);
            this.$element_info.find('.'+this.options.paginationInfoClass).show();
        }

        // 更新查询条件时，页码返回第一页
        var $form = this.options.$form;
        if ($form) {
            $form.find('input, select').off('change.twbspage').
                on('change.twbspage', function () {
                    $form.find('input[name=page]').val(that.options.startPage||1);
                });
        }

        this.render(this.getPages(this.options.currentPage||this.options.startPage));
        this.setupEvents();

        return this;
    },

    destroy: function () {
        this.$element.empty();
        this.$element.removeData('twbs-pagination');
        this.$element.unbind('page');
        this.$element_info.unbind('goToPage');
        return this;
    },

    show: function (page) {
        if (page < 1 || page > this.options.totalPages) {
            throw new Error('Page is incorrect.');
        }
        this.options.currentPage=page;
        this.render(this.getPages(page));
        this.setupEvents();

        this.$element.trigger('page', page);
        this.$element_info.trigger('goToPage',page);
        return this;
    },

    buildListItems: function (pages) {
        var $listItems = $();

        if (this.options.first) {
            $listItems = $listItems.add(this.buildItem('first', 1));
        }

        if (this.options.prev) {
            var prev = pages.currentPage > 1 ? pages.currentPage - 1 : 1;
            $listItems = $listItems.add(this.buildItem('prev', prev));
        }

        for (var i = 0; i < pages.numeric.length; i++) {
            $listItems = $listItems.add(this.buildItem('page', pages.numeric[i]));
        }

        if (this.options.next) {
            var next = pages.currentPage >= this.options.totalPages ? this.options.totalPages : pages.currentPage + 1;
            $listItems = $listItems.add(this.buildItem('next', next));
        }

        if (this.options.last) {
            $listItems = $listItems.add(this.buildItem('last', this.options.totalPages));
        }

        return $listItems;
    },

    buildItem: function (type, page) {
        var itemContainer = $('<li></li>'),
            itemContent = $('<a></a>'),
            itemText = null;

        itemContainer.addClass(type);
        itemContainer.data('page', page);

        switch (type) {
            case 'page':
                itemText = page;
                break;
            case 'first':
                itemText = this.options.first;
                break;
            case 'prev':
                itemText = this.options.prev;
                break;
            case 'next':
                itemText = this.options.next;
                break;
            case 'last':
                itemText = this.options.last;
                break;
            default:
                break;
        }

        itemContainer.append(itemContent.attr('href', this.href(page)).html(itemText));
        return itemContainer;
    },

    getPages: function (currentPage) {
        var pages = [];
        var currentPage=Number(currentPage);

        var half = Math.floor(this.options.visiblePages / 2);
        var start = currentPage - half + 1 - this.options.visiblePages % 2;
        var end = currentPage + half;

        // handle boundary case
        if (start <= 0) {
            start = 1;
            end = this.options.visiblePages;
        }
        if (end > this.options.totalPages) {
            start = this.options.totalPages - this.options.visiblePages + 1;
            end = this.options.totalPages;
        }

        var itPage = start;
        while (itPage <= end) {
            pages.push(itPage);
            itPage++;
        }

        return {"currentPage": currentPage, "numeric": pages};
    },

    render: function (pages) {
        this.$listContainer.children().remove();
        this.$listContainer.append(this.buildListItems(pages));

        this.$listContainer.find('.page').removeClass('active');
        this.$listContainer.find('.page').filter(function () {
            return $(this).data('page') === pages.currentPage;
        }).addClass('active');

        if (pages.currentPage === 1) {
            this.$listContainer.find('.prev a,.first a').attr("href", "javascript:void(0);");
        }

        if (pages.currentPage === this.options.totalPages) {
            this.$listContainer.find('.next a,.last a').attr("href", "javascript:void(0);");
        }

        this.$listContainer.find('.first')
            .toggleClass('disabled', pages.currentPage === 1);

        this.$listContainer.find('.last')
            .toggleClass('disabled', pages.currentPage === this.options.totalPages);

        this.$listContainer.find('.prev')
            .toggleClass('disabled', pages.currentPage === 1);

        this.$listContainer.find('.next')
            .toggleClass('disabled', pages.currentPage === this.options.totalPages);

        if (this.options.info) {
            this.$element_info.find('.info-total-size').html(this.options.totalSize);
            this.$element_info.find('.info-current-size').html(
                ((pages.currentPage * this.options.pageSize - this.options.pageSize + 1) || 1)
            );
            this.$element_info.find('.info-currentPage').val(
                pages.currentPage
            );
            this.$element_info.find('.info-end-size').html(
                Math.min(
                    this.options.totalSize,
                    pages.currentPage * this.options.pageSize
                )
            );
            var totalPages=this.options.totalPages;
            var $element_info=this.$element_info;

            this.$element_info.find('.info-currentPage').blur(function(){
                var $this = $(this),
                    thisValue = $this.val(),
                    targetValue = thisValue;

                if(/^[0-9]*$/.test($(this).val())) {
                    if (thisValue > totalPages) {
                        targetValue = totalPages;
                        $this.val(totalPages);
                    } else if (thisValue <= 0) {
                        targetValue = 1;
                        $this.val(1);
                    }
                }else{
                    $this.val(pages.currentPage);
                }
            });

        }
    },

    setupEvents: function () {
        var base = this;
        this.$listContainer.find('li').each(function () {
            var $this = $(this);
            $this.off();
            if ($this.hasClass('disabled') || $this.hasClass('active')) return;
            $this.click(function () {
                base.show(parseInt($this.data('page'), 10));
            });
        });
        this.$element_info.find('.info-goToPage').unbind('click');
        this.$element_info.find('.info-goToPage').click(function(){
            var currPage = base.$element_info.find('.info-currentPage').val();
            if(/\D/.test(currPage)){
                currPage=1;
            }
            if(currPage!=base.options.currentPage){
                base.show(currPage);
            }

            return false;
        });
    },

    href: function (c) {
        return this.options.href.replace(this.options.hrefVariable, c);
    }

};

// PLUGIN DEFINITION

$.fn.pagination = function (option) {
    var args = Array.prototype.slice.call(arguments, 1);
    var methodReturn;

    var $this = $(this);
    var data = $this.data('twbs-pagination');
    var options = typeof option === 'object' && option;
    if (options.$form) {
        if ($.trim(options.$form.find('input[name=page]').val()) === '1'||$.trim(options.$form.find('input[name=page]').val()) === '0') {
            data = false;
        }
    }

    if (!data) $this.data('twbs-pagination', (data = new Pagination(this, options) ));
    if (typeof option === 'string') methodReturn = data[ option ].apply(data, args);

    return ( methodReturn === undefined ) ? $this : methodReturn;
};

$.fn.pagination.defaults = {
    $form: null,
    totalSize: 0,
    pageSize: 20,
    totalPages: 0,
    startPage: 1,
    currentPage: 1,
    visiblePages: 5,
    href: 'javascript:void(0);',
    hrefVariable: '{{number}}',
    first: false,     // First
    prev: '上一页',    // Previous
    next: '下一页',    // Next
    last: false,      // Last
    info: false,
    paginationInfoClass: 'pagination-info',
    paginationClass: 'pagination',
    onPageClick: null,
    onGoToPageClick: null
};

$.fn.pagination.Constructor = Pagination;

$.fn.pagination.noConflict = function () {
    $.fn.pagination = old;
    return this;
};
