export interface HotspotOnlinePackagePurchaseData {
  createdOn: number;
  updatedOn: number;
  id: number;
  orderNo: string;
  pricingPlanId: number;
  pricingPlan?: PricingPlan;
  totalAmount: number;
  payableAmount: number;
  customerId: number;
  clientCustomerId: number;
  client: Client;
  clientId: number;
  zoneManager?: ZoneManager;
  zoneManagerId: number;
  subZoneManager?: SubZoneManager;
  subZoneManagerId: number;
  retailer?: Retailer;
  retailerId: number;
  clientCommission: number;
  zoneCommission: number;
  subZoneCommission: number;
  retailerCommission: number;
  usedIp: string;
  usedDeviceId: number;
  status: string;
  paymentGatewayId: number;
  paymentGateway?: PaymentGateway;
  paymentGatewayConfigId: number;
  vlanId: string;
  mac: string;
}

interface PricingPlan {
  createdOn: number;
  updatedOn: number;
  id: number;
  name: string;
  price: number;
  dataRate: number;
  dataRateUnit: string;
  validity: number;
  validityUnit: string;
  otpLimit: number;
  packageCategory: string;
  isActive: boolean;
}

interface Client {
  id: number;
  name: string;
  username: string;
}

interface ZoneManager {
  id: number;
  name: string;
  username: string;
}

interface SubZoneManager {
  id: number;
  name: string;
  username: string;
}

interface Retailer {
  id: number;
  name: string;
  username: string;
}

interface PaymentGateway {
  id: number;
  bankName: string;
}
