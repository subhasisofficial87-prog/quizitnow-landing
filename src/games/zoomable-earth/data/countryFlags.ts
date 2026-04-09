/** ISO 3166-1 alpha-2 codes for flag emojis, keyed by alpha-3 */
const alpha3ToAlpha2: Record<string, string> = {
  AFG:"AF",ALB:"AL",DZA:"DZ",AGO:"AO",ARG:"AR",AUS:"AU",AUT:"AT",BGD:"BD",
  BEL:"BE",BTN:"BT",BOL:"BO",BIH:"BA",BWA:"BW",BRA:"BR",BGR:"BG",MMR:"MM",
  BDI:"BI",BLR:"BY",KHM:"KH",CMR:"CM",CAN:"CA",CAF:"CF",LKA:"LK",TCD:"TD",
  CHL:"CL",CHN:"CN",COL:"CO",COG:"CG",COD:"CD",CRI:"CR",HRV:"HR",CUB:"CU",
  CYP:"CY",CZE:"CZ",DNK:"DK",DOM:"DO",ECU:"EC",EGY:"EG",SLV:"SV",GNQ:"GQ",
  ERI:"ER",EST:"EE",ETH:"ET",FJI:"FJ",FIN:"FI",FRA:"FR",GAB:"GA",GMB:"GM",
  GEO:"GE",DEU:"DE",GHA:"GH",GRC:"GR",GRL:"GL",GTM:"GT",GIN:"GN",GUY:"GY",
  HTI:"HT",HND:"HN",HUN:"HU",ISL:"IS",IND:"IN",IDN:"ID",IRN:"IR",IRQ:"IQ",
  IRL:"IE",ISR:"IL",ITA:"IT",JAM:"JM",JPN:"JP",JOR:"JO",KAZ:"KZ",KEN:"KE",
  PRK:"KP",KOR:"KR",KWT:"KW",KGZ:"KG",LAO:"LA",LBN:"LB",LSO:"LS",LBR:"LR",
  LBY:"LY",LTU:"LT",LUX:"LU",MDG:"MG",MWI:"MW",MYS:"MY",MLI:"ML",MRT:"MR",
  MEX:"MX",MNG:"MN",MDA:"MD",MNE:"ME",MAR:"MA",MOZ:"MZ",NAM:"NA",NPL:"NP",
  NLD:"NL",NZL:"NZ",NIC:"NI",NER:"NE",NGA:"NG",NOR:"NO",OMN:"OM",PAK:"PK",
  PAN:"PA",PNG:"PG",PRY:"PY",PER:"PE",PHL:"PH",POL:"PL",PRT:"PT",QAT:"QA",
  ROU:"RO",RUS:"RU",RWA:"RW",SAU:"SA",SEN:"SN",SRB:"RS",SLE:"SL",SGP:"SG",
  SVK:"SK",SVN:"SI",SOM:"SO",ZAF:"ZA",ESP:"ES",SDN:"SD",SUR:"SR",SWZ:"SZ",
  SWE:"SE",CHE:"CH",SYR:"SY",TJK:"TJ",TZA:"TZ",THA:"TH",TGO:"TG",TTO:"TT",
  TUN:"TN",TUR:"TR",TKM:"TM",UGA:"UG",UKR:"UA",ARE:"AE",GBR:"GB",USA:"US",
  URY:"UY",UZB:"UZ",VEN:"VE",VNM:"VN",YEM:"YE",ZMB:"ZM",ZWE:"ZW",PSE:"PS",
  SLB:"SB",DJI:"DJ",BEN:"BJ",BFA:"BF",GNB:"GW",SSD:"SS",
};

export function getFlag(alpha3: string): string {
  const a2 = alpha3ToAlpha2[alpha3];
  if (!a2) return "";
  return String.fromCodePoint(
    ...a2.split("").map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)
  );
}
