import {Deserializable} from './deserializable.model';

export class EOrder implements Deserializable {
  RecId_:  number;
  RowId_:  string;
  Style_: string;
  Selection_: boolean;
  HasAttachment_: boolean;
  ord_InternalId: string;
  ord_ExternalId: string;
  ord_Description: string;
  ord_ReceiptTime: number;
  DM_ord_ReceiptTime: string;
  ord_TariffingStatus: number;
  ord_Urgency: number;
  ord_SamplingLocation: number;
  ord_Status: number;
  ord_LowestObjectTime: number;
  DM_ord_LowestObjectTime: string;
  ord_ShortId: string;
  ord_Question: string;
  ord_PrescriptionTime: number;
  DM_ord_PrescriptionTime: string;
  ord_ReportInformation: string;
  ord_IssuerInfo: string;
  ord_Context: string;
  ord_ContextDate: number;
  ord_ContextInfo: string;
  ord_IsConsult: boolean;
  ord_Department: number;
  ord_Encounter: number;
  ord_Issuer: number;
  ord_Object: number;
  ord_Agent: number;
  ord_Sampler: number;
  ord_Study: number;
  ord_StudyEpisode: number;
  ord_Id: number;
  DepartmentName: string;
  DepartmentId: number;
  EncounterExternalId: string;
  EncounterId: number;
  IssuerName: string;
  IssuerId: number;
  ObjectExternalization: string;
  ObjectId: number;
  AgentName: string;
  AgentId: number;
  SamplerMnemonic: string;
  SamplerCorrespondent: number;
  SamplerId: number;
  SamplerCorrespondentName: string;
  SamplerCorrespondentId: number;
  StudyName: string;
  StudyId: number;
  StudyEpisodeMnemonic: string;
  StudyEpisodeId: number;
  // TODO(JVA) site attributes can vary
  SA_60: string;
  SA_4: string;
  SA_334: string;
  SA_323: string;
  SA_261: string;
  SA_290: string;
  SA_291: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

