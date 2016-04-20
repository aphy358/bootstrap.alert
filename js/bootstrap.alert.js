(function ($) {
    /**
     * Show a confirmation dialog
     * @param [options] {{title, text, confirm, cancel, confirmButton, cancelButton, post, confirmButtonClass}}
     */
    $.confirm = function (options) {
        // Do nothing when active confirm modal.
        if ($(parent.document.body).find('.confirmation-modal').length > 0) {
            $(parent.document.body).find('.confirmation-modal').remove();
        }

        // Merge params into settings
        var settings = $.extend({}, $.confirm.options, options);

        // Modal
        var modalHeader = '';
        var modalFooter = '';
        var modalBody = '';
        var modalConfirmBtn = '';
        var modalCancelBtn = '';
        if (options.title != null) {
            modalHeader =
                '<div class=modal-header style="height:40px;">' +
                    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="position:absolute; top:11px; right:10px;">&times;</button>' +
                    '<h4 class="modal-title" style="position:absolute; top:8px;">' + settings.title + '</h4>' +
                '</div>';

            modalBody = '<div class="modal-body">' + settings.text + '</div>';
        }
        else {
            modalBody =
                '<div class="modal-body">' +
                    (options.confirmButton == null ? ('<button type="button" class="close" data-dismiss="modal" aria-label="true">&times;</button>') : ('')) +
                    settings.text +
                '</div>';
        }

        if (options.confirmButton != null) {
            if (options.cancelButton != null) {
                modalConfirmBtn =
                    '<button class="confirm btn btn-mini ' + settings.confirmButtonClass + '" type="button" data-dismiss="modal" style="height:30px;width:40px; padding:0px;position:absolute;bottom:6px;right:65px;">' +
                        settings.confirmButton +
                    '</button>';

                modalCancelBtn =
                    '<button class="cancel btn btn-mini ' + settings.cancelButtonClass + '" type="button" data-dismiss="modal" style=" height:30px;width:40px; padding:0px;position:absolute;bottom:6px;right:10px;margin-right:10px;">' +
                        settings.cancelButton +
                    '</button>';
            }
            else {
                modalConfirmBtn =
                   '<button class="confirm btn btn-mini ' + settings.confirmButtonClass + '" type="button" data-dismiss="modal" style="height:30px;width:40px; padding:0px;position:absolute;bottom:6px;right:10px;margin-right:10px;">' +
                       settings.confirmButton +
                   '</button>';
            }
        }

        if (options.controlButton) {
            modalFooter =
                '<div class="modal-footer" style="height:45px;">' +
                    modalConfirmBtn +
                    modalCancelBtn +
                '</div>';
        }

        var modalHTML = "";

        if (options.mousePosition) {
            var newX = window.event.clientX + 30;
            var newY = window.event.clientY - 80;

            //边界控制，document.documentElement.clientWidth：可见区域宽度  document.documentElement.clientHeight：可见区域高度
            newX = (newX + 300 > document.documentElement.clientWidth) ? (newX - 300 - 60) : newX;
            newY = (newY + 30) < 0 ? (newY + 80) : newY;

            modalHTML =
                    '<div class="confirmation-modal modal fade" tabindex="-1" role="dialog">' +
                        '<div class="modal-dialog" style="z-index:9999; position:absolute;">' +
                            '<div class="modal-content" style="width:300px; left:' + newX + 'px; top:' + newY + 'px; border-radius:0px;">' +
                                modalHeader +
                                modalBody +
                                modalFooter +
                            '</div>' +
                        '</div>' +
                    '</div>';
        }
        else {
            modalHTML =
                '<div class="confirmation-modal modal fade" tabindex="-1" role="dialog">' +
                    '<div class="modal-dialog" style="z-index:9999;">' +
                        '<div class="modal-content">' +
                            modalHeader +
                            modalBody +
                            modalFooter +
                        '</div>' +
                    '</div>' +
                '</div>';
        }

        var modal = $(modalHTML);

        switch (options.style) {
            case 'AlertWarning':
                {
                    modal.find('.modal-content').addClass('AlertWarning');
                    break;
                }
            case 'AlertSuccess':
                {
                    modal.find('.modal-content').addClass('AlertSuccess');
                    break;
                }
            case 'AlertError':
                {
                    modal.find('.modal-content').addClass('AlertError');
                    break;
                }
            default:
                {
                    break;
                }
        }

        modal.on('shown.bs.modal', function () {
        });
        modal.on('hidden.bs.modal', function () {
        });
        modal.find(".confirm").click(function () {
            settings.confirm();
        });
        modal.find(".cancel").click(function () {
        });

        // Show the modal
        $(parent.document.body).append(modal);                              //$("body").append(modal);

        if (options.confirm != null)
            modal.modal({ backdrop: 'static', keyboard: false });           //点击确认框以外部分，确认框不会隐藏
        else
            modal.modal('show');                                            //点击提示框以外部分，提示框隐藏
    };

    /**
     * Globally definable rules
     */
    $.confirm.options = {
        text: "Are you sure?",
        title: 'Notice',
        confirmButton: "Yes",
        cancelButton: "Cancel",
        style: null,
        controlButton: false,
        mousePosition: false,       //根据鼠标点击的坐标给出alert框的位置
        post: false,
        confirmButtonClass: "btn-primary",
        cancelButtonClass: "btn-default"
    }

    myAlertWarning = function (message, title) {
        var alertParams = {
            text: message,
            title: title,
            style: 'AlertWarning',
        };

        $.confirm(alertParams);
    };

    myAlertError = function (message, title) {
        var alertParams = {
            text: message,
            title: title,
            style: 'AlertError',
        };

        $.confirm(alertParams);
    };

    myAlertSuccess = function (message, callback, title) {
        var alertParams;
        if (callback != null) {
            alertParams = {
                text: message,
                title: title,
                style: 'AlertSuccess',
                controlButton: true,
                confirm: function (button) {
                    callback();
                },
                confirmButton: "确定",
                confirmButtonClass: "btn-primary",
            };
        }
        else {
            alertParams = {
                text: message,
                title: title,
                style: 'AlertSuccess',
            };
        }

        $.confirm(alertParams);
    };

    myConfirm = function (message, callback, title) {
        var alertParams = {
            text: message,
            title: title,
            controlButton: true,
            confirm: function (button) {
                if (callback != null)
                    callback();
            },
            confirmButton: "确定",
            cancelButton: "取消",
            confirmButtonClass: "btn-primary",
            cancelButtonClass: "btn-default"
        };

        $.confirm(alertParams);
    };

})(jQuery);