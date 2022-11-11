sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, JSONModel) {
		"use strict";

		return Controller.extend("dynamictable.controller.View1", {
			
			onInit: function () {
				const oModel = new JSONModel("/localService/values.json");
				oModel.attachRequestCompleted(this.initializeTable.bind(this));
				this.getView().setModel(oModel);
				window.view = this.getView();
				console.clear();
			},

			initializeTable: function (oRequest) {
				console.log(oRequest);
				const oData = oRequest.getSource().getData();
				const oModel = this.getView().getModel();
				const oTable = this.byId("myTable");
				oTable.setModel(oModel);
				oTable.bindColumns("/columns", (sId, oContext) => {
					const oColumnName = oContext.getObject().columnName;
					return new sap.ui.table.Column({
						label: oColumnName,
						template: new sap.m.Input({
							
						})
					});
				});
				oTable.bindRows("/rows");
				
			},

			onAddRow: function () {
				const oTable = this.byId("myTable");
				const oModel = this.getView().getModel();
				const aRows = oModel.getProperty("/rows");
				const oTemplate = {};
				Object.entries(aRows[0]).forEach(sProperty => oTemplate[sProperty] = "");
				aRows.push(oTemplate);
				oModel.setProperty("/rows", aRows);
				oTable.bindRows("/rows");
			},

			onAddColumn: function () {
				const oTable = this.byId("myTable");
				const oModel = this.getView().getModel();
				const sColumn = oModel.getProperty("/newColumn");
				const aColumns = oModel.getProperty("/columns");
				aColumns.push({"columnName": sColumn});
				oModel.setProperty("/columns", aColumns);
				oTable.bindColumns("/columns", (sId, oContext) => {
					const oColumnName = oContext.getObject().columnName;
					return new sap.ui.table.Column({
						label: oColumnName,
						template: new sap.m.Input()
					});
				});
			},

			onPrint: function () {
				console.log (this.getView().getModel().getProperty("/rows"));
			}
		});
	});
