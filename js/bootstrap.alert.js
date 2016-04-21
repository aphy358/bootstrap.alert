(function($) {
	/**
	 * Show a confirmation dialog
	 * @param [options] {{title, text, confirm, cancel, confirmButton, cancelButton, post, confirmButtonClass}}
	 */
	$.confirm = function(options) {
		var fn = function() {
			$(parent.document.body).find('.confirmation-modal').remove();
			$(parent.document.body).find('.modal-backdrop.fade.in').remove();
		};

		// 弹窗之前先把之前的弹出框DOM清掉
		fn();

		// Merge params into settings
		var settings = $.extend({}, $.confirm.options, options);

		var modal = $(settings.modal);
		var modalContent = $(settings.modalContent);
		if (options.style) {
			modalContent.addClass(options.style.toLowerCase());
		}
		// 先把主题框架内容加到页面，后续只要对modalContent操作即可
		$(parent.document.body).append(modal.append($(settings.modalDialog).append(modalContent)));

		if (options.title) {
			modalHeader = $(settings.modalHeader).append(settings.modalCloseBtn).append($(settings.modalTitle).text(settings.title));
			modalContent.append(modalHeader).append($(settings.modalBody).text(options.text));
		} else {
			modalContent.append($(settings.modalBody).text(options.text).append(settings.modalCloseBtn));
		}

		if (options.opbtn) { // 如果需要生成footer操作按钮“确定”、“取消”
			var modalFooter = $(settings.modalFooter);
			modalContent.append(modalFooter);

			if ("twobtn" == options.opbtn) { // 生成“确定”、“取消”两个按钮
				modalFooter.append(settings.modalConfirmBtn).append(settings.modalCancelBtn);
			} else if ("onebtn" == options.opbtn) { // 只生成“确定”按钮
				modalFooter.append(settings.modalConfirmBtn);
			}
		}

		modal.on('shown.bs.modal', function() {});
		modal.on('hidden.bs.modal', function() {});
		modal.find(".confirm").click(function() {
			settings.confirm();
		});
		modal.find(".cancel").click(function() {
			fn();
		});
		modal.find(".close").click(function() {
			fn();
		});

		if (options.opbtn)
			modal.modal({
				backdrop: 'static',
				keyboard: false
			}); //点击确认框以外部分，确认框不会隐藏
		else
			modal.modal('show'); //点击提示框以外部分，提示框隐藏
	};

	/**
	 * Globally definable rules
	 */
	$.confirm.options = {
		text: "Are you sure?",
		title: 'Notice',
		confirmButton: "Yes",
		cancelButton: "Cancel",
		post: false,

		modal: '<div class="confirmation-modal modal fade" tabindex="-1" role="dialog"></div>',
		modalDialog: '<div class="modal-dialog"></div>',
		modalContent: '<div class="modal-content"></div>',
		modalHeader: '<div class="modal-header"></div>',
		modalTitle: '<h4 class="modal-title"></h4>',
		modalCloseBtn: '<button type="button" class="close" data-dismiss="modal">&times;</button>',
		modalBody: '<div class="modal-body"></div>',
		modalFooter: '<div class="modal-footer"></div>',
		modalCancelBtn: '<button class="cancel btn btn-mini btn-default data-dismiss="modal">取消</button>',
		modalConfirmBtn: '<button class="confirm btn btn-mini btn-primary" data-dismiss="modal">确定</button>',
	}

	// message是弹出框显示的主题内容，param,可能是字符串，也可能是函数，title是弹出框标题
	// 这里要判断第二个参数是函数还是一个字符串，如果是字符串，则把这个alert框设置成相应的样式，如果是函数，则执行该回调函数
	myAlert = function(message, param, title) {
		var alertParams;
		if (typeof param == 'function') { // 如果是函数
			alertParams = {
				text: message,
				title: title,
				opbtn: "onebtn", // 这里的意思是告诉插件只在footer那里生成一个“确定”按钮
				confirm: function(button) {
					param();
				},
			};
		} else if (param == null || typeof param == 'string') { // 如果是字符串或为null
			alertParams = {
				text: message,
				title: title,
				style: param,
			};
		}

		$.confirm(alertParams);
	};

	// message是弹出框显示的主题内容，callback是回调函数，title是弹出框标题
	myConfirm = function(message, callback, title) {
		var alertParams = {
			text: message,
			title: title,
			opbtn: "twobtn", // 这里的意思是告诉插件在footer那里生成“确定”和“取消”按钮
			confirm: function(button) {
				if (callback != null)
					callback();
			},
		};

		$.confirm(alertParams);
	};

})(jQuery);