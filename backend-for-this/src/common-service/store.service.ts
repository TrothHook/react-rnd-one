import { Injectable } from '@nestjs/common';
import moment from 'moment';
import sequelize, { Op } from 'sequelize';
// import { CustomerCreditLimit } from 'src/models/CustomerCreditLimit.entity';
// import { CustomerOutstanding } from 'src/models/CustomerOutstanding.enity';
// import { SapStoreMaster } from 'src/models/SapStoreMaster.entity';
// import { StoreMaster } from 'src/models/StoreMaster.entity';

@Injectable()
export class StoreService {
//   generateStoreCode = async (
//     district_id: any,
//     state_id: any,
//     table_type: string,
//   ) => {
//     let code = '';
//     code = code + district_id.toString().padStart(2, '0');
//     code = code + state_id.toString().padStart(3, '0');
//     if (table_type == 'master') {
//       let { id } = await StoreMaster.findOne({
//         attributes: ['id'],
//         order: [['id', 'desc']],
//         raw: true,
//       });
//       code = code + (id + 1).toString().padStart(7, '0');
//     } else {
//       let { id } = await SapStoreMaster.findOne({
//         attributes: ['id'],
//         order: [['id', 'desc']],
//         raw: true,
//       });
//       code = code + (id + 1).toString().padStart(7, '0');
//     }
//     if (table_type != 'master') {
//       code = 'S' + code;
//     }
//     return code;
//   };

//   /**
//    *
//    * @param excelData
//    * @param storeData
//    * @returns
//    */
//   uploadCustomerOutstanding = async (
//     xlsxData: any,
//     user: any,
//     sapCodes: any,
//   ) => {
//     let insertData: any = [];
//     let store_id: any = null;
//     let storeData: any = [];

//     storeData = await SapStoreMaster.findAll({
//       attributes: [[sequelize.literal('MAX(id)'), 'id'], 'sap_code'],
//       where: {
//         sap_code: {
//           [Op.in]: sapCodes,
//         },
//       },
//       group: ['sap_code'],
//       raw: true,
//     });

//     xlsxData?.map((e: any) => {
//       store_id = storeData.filter((val: any) => {
//         if (val?.sap_code == e.sap_code) {
//           return val;
//         }
//       })[0]?.id;
//       !store_id && (store_id = null);
//       if (e?.sap_code && e?.net_amount && e?.as_on_date) {
//         insertData.push({
//           sap_code: e?.sap_code,
//           as_on_date: this.ExcelDateToJSDate(e?.as_on_date) || null,
//           company_code: e?.company_code || null,
//           net_amount: e?.net_amount || null,
//           day0_to_31: e?.day0_to_31 || null,
//           day32_to_45: e?.day32_to_45 || null,
//           day46_to_60: e?.day46_to_60 || null,
//           day61_to_90: e?.day61_to_90 || null,
//           day91_to_120: e?.day91_to_120 || null,
//           day181_to_365: e?.day181_to_365 || null,
//           day366_to_9999: e?.day366_to_9999 || null,
//           created_by: user?.userId,
//           sap_store_id: store_id,
//         });
//       }
//     });
//     // console.log('insertData', insertData);
//     return insertData;
//   };

//   /**
//    * Excel data
//    * loginUserData
//    * @param xlsxData
//    * @param user
//    * @returns
//    */
//   uploadCustomerCreditLimit = async (xlsxData: any, user: any) => {
//     let insertData: any = [];
//     let store_id: any = 0;
//     let item: any = [];
//     let storeData: any = [];
//     for (let i = 0; i < xlsxData?.length; i++) {
//       item = xlsxData[i];
//       storeData = await SapStoreMaster.findOne({
//         attributes: [[sequelize.literal('MAX(id)'), 'id'], 'sap_code'],
//         where: { sap_code: item?.sap_code },
//         group: ['sap_code'],
//         raw: true,
//       });
//       !storeData?.id ? (store_id = null) : (store_id = storeData?.id);
//       let isExits = await CustomerCreditLimit.count({
//         where: {
//           sap_code: item?.sap_code,
//         },
//       });
//       if (isExits > 0) {
//         await CustomerCreditLimit.update(
//           {
//             credit_limit_amount: item?.credit_limit_amount,
//             updated_by: user?.userId,
//           },
//           {
//             where: { sap_code: item?.sap_code },
//           },
//         );
//       } else {
//         insertData.push({
//           sap_code: item?.sap_code,
//           sap_store_id: store_id,
//           credit_limit_amount: item?.credit_limit_amount,
//           created_by: user?.userId,
//         });
//       }
//     }
//     return insertData;
//   };

//   uploadCustomerLedger = async (
//     xlsxData: any,
//     user:any,
//     sapCodes: any,
//     ) => {
//     let insertData: any = [];
    
//     let store_id: any = null;
//     let storeData: any = [];

//     storeData = await SapStoreMaster.findAll({
//       attributes: [[sequelize.literal('MAX(id)'), 'id'], 'sap_code'],
//       where: {
//         sap_code: {
//           [Op.in]: sapCodes,
//         },
//       },
//       group: ['sap_code'],
//       raw: true,
//     });

//     xlsxData?.map((e: any) => {
//       store_id = storeData.filter((val: any) => {
//         if (val?.sap_code == e.sap_code) {
//           return val;
//         }
//       })[0]?.id;
//       !store_id && (store_id = null);
//       if (e?.sap_code) {
//         insertData.push({
//           sap_store_id: store_id,
//           sap_code: e?.sap_code,
//           company_code: e?.company_code || null,
//           assign_no: e?.assign_no || null,
//           particulars : e?.particulars || null,
//           remarks: e?.remarks || null,
//           doc_no: e?.doc_no || null,
//           debit_amount: e?.debit_amount || null,
//           credit_amount: e?.credit_amount || null,
//           ledger_posting_date: e?.ledger_posting_date || null,
//           ledger_entry_date: e?.ledger_entry_date || null,
//           created_by: user?.userId
//         });
//       }
//     });
//     return insertData;
//   }

//   ExcelDateToJSDate = (serial: any) => {
//     var utc_days = Math.floor(serial - 25569);
//     var utc_value = utc_days * 86400;
//     var date_info = new Date(utc_value * 1000);
//     var fractional_day = serial - Math.floor(serial) + 0.0000001;
//     var total_seconds = Math.floor(86400 * fractional_day);

//     var seconds = total_seconds % 60;

//     total_seconds -= seconds;

//     var hours = Math.floor(total_seconds / (60 * 60));
//     var minutes = Math.floor(total_seconds / 60) % 60;

//     return moment(
//       new Date(
//         date_info.getFullYear(),
//         date_info.getMonth(),
//         date_info.getDate(),
//         hours,
//         minutes,
//         seconds,
//       ),
//     ).format('YYYY-MM-DD');
//   };

//   prepareStoreFilterQuery = (customFilterValues: any) => {
//     let whereCondition: any = {};
//     let innerWhereStoreProduct: any = {};
//     let fromDate: any = new Date().toLocaleDateString('sv-SE');
//     let toDate: any = new Date().toLocaleDateString('sv-SE');
//     if (
//       customFilterValues !== undefined &&
//       customFilterValues !== null &&
//       customFilterValues !== 'null'
//     ) {
//       customFilterValues = JSON.parse(customFilterValues);
//       Object.keys(customFilterValues).map((itemVal) => {
//         switch (itemVal) {
//           case 'category':
//             innerWhereStoreProduct.product_type_id = {
//               [Op.in]: customFilterValues[itemVal],
//             };
//             break;
//           case 'store_type':
//             innerWhereStoreProduct.potential_status =
//               customFilterValues[itemVal];
//             break;
//           case 'from_date':
//             fromDate = customFilterValues[itemVal];
//             customFilterValues['to_date']
//               ? (toDate = customFilterValues['to_date'])
//               : '';
//             whereCondition.created_at = {
//               [Op.between]: [`${fromDate} 00:00:00`, `${toDate} 23:59:59`],
//             };
//             break;
//           case 'to_date':
//             toDate = customFilterValues[itemVal];
//             customFilterValues['from_date']
//               ? (whereCondition.created_at = {
//                   [Op.between]: [
//                     `${customFilterValues['from_date']} 00:00:00`,
//                     `${toDate} 23:59:59`,
//                   ],
//                 })
//               : '';
//             break;
//           case 'field_name':
//             customFilterValues['field_value']
//               ? (whereCondition[customFilterValues[itemVal]] = {
//                   [Op.like]: `%${customFilterValues['field_value']}%`,
//                 })
//               : '';
//             break;
//           case 'district_id':
//             whereCondition.district_id = {
//               [Op.in]: customFilterValues[itemVal],
//             };
//             break;
//           case 'created_by':
//             whereCondition.created_by = {
//               [Op.in]: customFilterValues[itemVal],
//             };
//             break;
//           default:
//             break;
//         }
//       });
//     }
//     return {
//       whereCondition,
//       innerWhereStoreProduct,
//     };
//   };
}
