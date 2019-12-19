import { EOrder } from './e-order';

describe('EOrder', () => {
  let jsonEOrder;
  let eOrder: EOrder;
  beforeEach(() => {
    jsonEOrder = {
      "RecId_": 2496,
      "RowId_": "AAAAAAAACcA=",
      "Style_": null,
      "Selection_": false,
      "HasAttachment_": false,
      "ord_InternalId": "20190905-00162",
      "ord_ExternalId": null,
      "ord_Description": null,
      "ord_ReceiptTime": 2458733.686111,
      "DM_ord_ReceiptTime": "2019-09-05T16:28:00.000",
      "ord_TariffingStatus": 1,
      "ord_Urgency": 1,
      "ord_SamplingLocation": null,
      "ord_Status": 3,
      "ord_LowestObjectTime": 2458733.686111,
      "DM_ord_LowestObjectTime": "2019-09-05T16:28:00.000",
      "ord_ShortId": "090516281260",
      "ord_Question": null,
      "ord_PrescriptionTime": 2458733.333333,
      "DM_ord_PrescriptionTime": "2019-09-05T08:00:00.000",
      "ord_ReportInformation": null,
      "ord_IssuerInfo": null,
      "ord_Context": null,
      "ord_ContextDate": null,
      "ord_ContextInfo": null,
      "ord_IsConsult": false,
      "ord_Department": 3510,
      "ord_Encounter": 14097,
      "ord_Issuer": 161511,
      "ord_Object": 22654,
      "ord_Agent": 1551,
      "ord_Sampler": null,
      "ord_Study": null,
      "ord_StudyEpisode": null,
      "ord_Id": 48844,
      "DepartmentName": "Labo SZRoeselare",
      "DepartmentId": 3510,
      "EncounterExternalId": "perf-1567526286#99",
      "EncounterId": 14097,
      "IssuerName": "Haney Gemma",
      "IssuerId": 161511,
      "ObjectExternalization": "CLAUWS, LEONA, LEEN (F), 19/05/1983",
      "ObjectId": 22654,
      "AgentName": "dagopname",
      "AgentId": 1551,
      "SamplerMnemonic": null,
      "SamplerCorrespondent": null,
      "SamplerId": null,
      "SamplerCorrespondentName": null,
      "SamplerCorrespondentId": null,
      "StudyName": null,
      "StudyId": null,
      "StudyEpisodeMnemonic": null,
      "StudyEpisodeId": null,
      "SA_60": null,
      "SA_4": "",
      "SA_334": "",
      "SA_323": "",
      "SA_261": null,
      "SA_290": null,
      "SA_291": null
    };
    eOrder = new EOrder().deserialize(jsonEOrder);
  });
  it('should create an instance', () => {
    expect(new EOrder()).toBeTruthy();
  });

  it('deserializes an eOrder json object to an EOrder object', () => {
    expect(eOrder instanceof EOrder).toBeTruthy();
    expect(eOrder.RecId_).toEqual(2496);
    expect(eOrder.HasAttachment_).toBeFalsy();
    expect(eOrder.ord_ShortId).toEqual('090516281260');
    expect(eOrder.SamplerCorrespondentId).toBeNull();
    expect(eOrder.SA_291).toBeNull();
  });
});
