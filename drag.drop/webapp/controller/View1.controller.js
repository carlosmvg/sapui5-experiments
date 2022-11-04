sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/ui/model/json/JSONModel",
		"drag/drop/utils/Utils",
		"sap/ui/thirdparty/jquery"
	],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, JSONModel, Utils, jQuery) {
		"use strict";

		return Controller.extend("drag.drop.controller.View1", {

			onInit: function () {
				// set explored app's demo model on this sample
				this.oProductsModel = this.initSampleProductsModel();
				this.getView().setModel(this.oProductsModel);
				window.model = this.oProductsModel;
			},

			onExit: function () {
				this.oProductsModel.destroy();
			},

			initSampleProductsModel: function () {
				var oModel = new JSONModel();

				oModel.loadData("mockData/products.json");
				oModel.attachRequestCompleted((_oModel) => {
					const oData = _oModel.getSource().getData();
					// prepare and initialize the rank property
					oData.ProductCollection.forEach(function (oProduct) {
						oProduct.Rank = Utils.ranking.Initial;
					}, this);

					oModel.setData(oData);
				});

				return oModel;
			},

			moveToAvailableProductsTable: function () {
				this.byId("selectedProducts").getController().moveToAvailableProductsTable();
			},

			moveToSelectedProductsTable: function () {
				this.byId("availableProducts").getController().moveToSelectedProductsTable();
			}


		});
	});