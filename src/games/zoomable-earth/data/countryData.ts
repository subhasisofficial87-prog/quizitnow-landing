export interface CountryInfo {
  name: string;
  capital: string;
  population: string;
  currency: string;
  currencyCode: string;
  usdValue: string;
  gdpPerCapita: number;
}

export const countryData: Record<string, CountryInfo> = {
  USA: { name: "United States", capital: "Washington, D.C.", population: "331,900,000", currency: "US Dollar", currencyCode: "USD", usdValue: "1.00", gdpPerCapita: 76330 },
  CAN: { name: "Canada", capital: "Ottawa", population: "40,100,000", currency: "Canadian Dollar", currencyCode: "CAD", usdValue: "0.74", gdpPerCapita: 52720 },
  MEX: { name: "Mexico", capital: "Mexico City", population: "128,900,000", currency: "Mexican Peso", currencyCode: "MXN", usdValue: "0.058", gdpPerCapita: 10950 },
  BRA: { name: "Brazil", capital: "Brasília", population: "214,300,000", currency: "Brazilian Real", currencyCode: "BRL", usdValue: "0.20", gdpPerCapita: 8920 },
  ARG: { name: "Argentina", capital: "Buenos Aires", population: "46,000,000", currency: "Argentine Peso", currencyCode: "ARS", usdValue: "0.0012", gdpPerCapita: 13650 },
  CHL: { name: "Chile", capital: "Santiago", population: "19,500,000", currency: "Chilean Peso", currencyCode: "CLP", usdValue: "0.0011", gdpPerCapita: 16800 },
  COL: { name: "Colombia", capital: "Bogotá", population: "51,900,000", currency: "Colombian Peso", currencyCode: "COP", usdValue: "0.00024", gdpPerCapita: 6630 },
  PER: { name: "Peru", capital: "Lima", population: "33,700,000", currency: "Peruvian Sol", currencyCode: "PEN", usdValue: "0.27", gdpPerCapita: 7130 },
  VEN: { name: "Venezuela", capital: "Caracas", population: "28,400,000", currency: "Bolívar", currencyCode: "VES", usdValue: "0.027", gdpPerCapita: 3740 },
  GBR: { name: "United Kingdom", capital: "London", population: "67,800,000", currency: "Pound Sterling", currencyCode: "GBP", usdValue: "1.27", gdpPerCapita: 46510 },
  FRA: { name: "France", capital: "Paris", population: "68,000,000", currency: "Euro", currencyCode: "EUR", usdValue: "1.09", gdpPerCapita: 44410 },
  DEU: { name: "Germany", capital: "Berlin", population: "84,400,000", currency: "Euro", currencyCode: "EUR", usdValue: "1.09", gdpPerCapita: 51380 },
  ITA: { name: "Italy", capital: "Rome", population: "58,900,000", currency: "Euro", currencyCode: "EUR", usdValue: "1.09", gdpPerCapita: 34780 },
  ESP: { name: "Spain", capital: "Madrid", population: "47,800,000", currency: "Euro", currencyCode: "EUR", usdValue: "1.09", gdpPerCapita: 30120 },
  PRT: { name: "Portugal", capital: "Lisbon", population: "10,300,000", currency: "Euro", currencyCode: "EUR", usdValue: "1.09", gdpPerCapita: 24570 },
  NLD: { name: "Netherlands", capital: "Amsterdam", population: "17,700,000", currency: "Euro", currencyCode: "EUR", usdValue: "1.09", gdpPerCapita: 57430 },
  BEL: { name: "Belgium", capital: "Brussels", population: "11,600,000", currency: "Euro", currencyCode: "EUR", usdValue: "1.09", gdpPerCapita: 51250 },
  CHE: { name: "Switzerland", capital: "Bern", population: "8,800,000", currency: "Swiss Franc", currencyCode: "CHF", usdValue: "1.13", gdpPerCapita: 93720 },
  AUT: { name: "Austria", capital: "Vienna", population: "9,100,000", currency: "Euro", currencyCode: "EUR", usdValue: "1.09", gdpPerCapita: 53640 },
  SWE: { name: "Sweden", capital: "Stockholm", population: "10,500,000", currency: "Swedish Krona", currencyCode: "SEK", usdValue: "0.096", gdpPerCapita: 55690 },
  NOR: { name: "Norway", capital: "Oslo", population: "5,500,000", currency: "Norwegian Krone", currencyCode: "NOK", usdValue: "0.095", gdpPerCapita: 82830 },
  DNK: { name: "Denmark", capital: "Copenhagen", population: "5,900,000", currency: "Danish Krone", currencyCode: "DKK", usdValue: "0.15", gdpPerCapita: 67800 },
  FIN: { name: "Finland", capital: "Helsinki", population: "5,600,000", currency: "Euro", currencyCode: "EUR", usdValue: "1.09", gdpPerCapita: 53660 },
  POL: { name: "Poland", capital: "Warsaw", population: "37,700,000", currency: "Polish Złoty", currencyCode: "PLN", usdValue: "0.25", gdpPerCapita: 17840 },
  UKR: { name: "Ukraine", capital: "Kyiv", population: "43,800,000", currency: "Ukrainian Hryvnia", currencyCode: "UAH", usdValue: "0.027", gdpPerCapita: 4530 },
  ROU: { name: "Romania", capital: "Bucharest", population: "19,000,000", currency: "Romanian Leu", currencyCode: "RON", usdValue: "0.22", gdpPerCapita: 14860 },
  GRC: { name: "Greece", capital: "Athens", population: "10,400,000", currency: "Euro", currencyCode: "EUR", usdValue: "1.09", gdpPerCapita: 20870 },
  TUR: { name: "Turkey", capital: "Ankara", population: "85,300,000", currency: "Turkish Lira", currencyCode: "TRY", usdValue: "0.031", gdpPerCapita: 10620 },
  RUS: { name: "Russia", capital: "Moscow", population: "144,200,000", currency: "Russian Ruble", currencyCode: "RUB", usdValue: "0.011", gdpPerCapita: 12170 },
  CHN: { name: "China", capital: "Beijing", population: "1,412,000,000", currency: "Chinese Yuan", currencyCode: "CNY", usdValue: "0.14", gdpPerCapita: 12720 },
  JPN: { name: "Japan", capital: "Tokyo", population: "125,700,000", currency: "Japanese Yen", currencyCode: "JPY", usdValue: "0.0067", gdpPerCapita: 33820 },
  KOR: { name: "South Korea", capital: "Seoul", population: "51,700,000", currency: "South Korean Won", currencyCode: "KRW", usdValue: "0.00075", gdpPerCapita: 32250 },
  PRK: { name: "North Korea", capital: "Pyongyang", population: "26,100,000", currency: "North Korean Won", currencyCode: "KPW", usdValue: "0.0011", gdpPerCapita: 640 },
  IND: { name: "India", capital: "New Delhi", population: "1,428,600,000", currency: "Indian Rupee", currencyCode: "INR", usdValue: "0.012", gdpPerCapita: 2410 },
  PAK: { name: "Pakistan", capital: "Islamabad", population: "231,400,000", currency: "Pakistani Rupee", currencyCode: "PKR", usdValue: "0.0036", gdpPerCapita: 1590 },
  BGD: { name: "Bangladesh", capital: "Dhaka", population: "169,400,000", currency: "Bangladeshi Taka", currencyCode: "BDT", usdValue: "0.0091", gdpPerCapita: 2690 },
  IDN: { name: "Indonesia", capital: "Jakarta", population: "275,500,000", currency: "Indonesian Rupiah", currencyCode: "IDR", usdValue: "0.000063", gdpPerCapita: 4790 },
  THA: { name: "Thailand", capital: "Bangkok", population: "71,800,000", currency: "Thai Baht", currencyCode: "THB", usdValue: "0.029", gdpPerCapita: 7230 },
  VNM: { name: "Vietnam", capital: "Hanoi", population: "99,500,000", currency: "Vietnamese Đồng", currencyCode: "VND", usdValue: "0.000041", gdpPerCapita: 4160 },
  MYS: { name: "Malaysia", capital: "Kuala Lumpur", population: "33,900,000", currency: "Malaysian Ringgit", currencyCode: "MYR", usdValue: "0.22", gdpPerCapita: 12380 },
  PHL: { name: "Philippines", capital: "Manila", population: "115,600,000", currency: "Philippine Peso", currencyCode: "PHP", usdValue: "0.018", gdpPerCapita: 3620 },
  SGP: { name: "Singapore", capital: "Singapore", population: "5,900,000", currency: "Singapore Dollar", currencyCode: "SGD", usdValue: "0.75", gdpPerCapita: 65230 },
  AUS: { name: "Australia", capital: "Canberra", population: "26,400,000", currency: "Australian Dollar", currencyCode: "AUD", usdValue: "0.66", gdpPerCapita: 64490 },
  NZL: { name: "New Zealand", capital: "Wellington", population: "5,200,000", currency: "New Zealand Dollar", currencyCode: "NZD", usdValue: "0.61", gdpPerCapita: 48070 },
  ZAF: { name: "South Africa", capital: "Pretoria", population: "60,400,000", currency: "South African Rand", currencyCode: "ZAR", usdValue: "0.055", gdpPerCapita: 6010 },
  NGA: { name: "Nigeria", capital: "Abuja", population: "223,800,000", currency: "Nigerian Naira", currencyCode: "NGN", usdValue: "0.00065", gdpPerCapita: 2180 },
  EGY: { name: "Egypt", capital: "Cairo", population: "104,300,000", currency: "Egyptian Pound", currencyCode: "EGP", usdValue: "0.032", gdpPerCapita: 3900 },
  KEN: { name: "Kenya", capital: "Nairobi", population: "55,100,000", currency: "Kenyan Shilling", currencyCode: "KES", usdValue: "0.0078", gdpPerCapita: 2100 },
  ETH: { name: "Ethiopia", capital: "Addis Ababa", population: "126,500,000", currency: "Ethiopian Birr", currencyCode: "ETB", usdValue: "0.018", gdpPerCapita: 1020 },
  GHA: { name: "Ghana", capital: "Accra", population: "33,500,000", currency: "Ghanaian Cedi", currencyCode: "GHS", usdValue: "0.065", gdpPerCapita: 2360 },
  TZA: { name: "Tanzania", capital: "Dodoma", population: "65,500,000", currency: "Tanzanian Shilling", currencyCode: "TZS", usdValue: "0.00038", gdpPerCapita: 1200 },
  MAR: { name: "Morocco", capital: "Rabat", population: "37,500,000", currency: "Moroccan Dirham", currencyCode: "MAD", usdValue: "0.10", gdpPerCapita: 3690 },
  DZA: { name: "Algeria", capital: "Algiers", population: "45,600,000", currency: "Algerian Dinar", currencyCode: "DZD", usdValue: "0.0074", gdpPerCapita: 3950 },
  SAU: { name: "Saudi Arabia", capital: "Riyadh", population: "36,900,000", currency: "Saudi Riyal", currencyCode: "SAR", usdValue: "0.27", gdpPerCapita: 30440 },
  ARE: { name: "UAE", capital: "Abu Dhabi", population: "9,400,000", currency: "UAE Dirham", currencyCode: "AED", usdValue: "0.27", gdpPerCapita: 49170 },
  IRN: { name: "Iran", capital: "Tehran", population: "87,900,000", currency: "Iranian Rial", currencyCode: "IRR", usdValue: "0.000024", gdpPerCapita: 4720 },
  IRQ: { name: "Iraq", capital: "Baghdad", population: "43,500,000", currency: "Iraqi Dinar", currencyCode: "IQD", usdValue: "0.00076", gdpPerCapita: 5040 },
  ISR: { name: "Israel", capital: "Jerusalem", population: "9,800,000", currency: "Israeli Shekel", currencyCode: "ILS", usdValue: "0.28", gdpPerCapita: 52170 },
  KAZ: { name: "Kazakhstan", capital: "Astana", population: "19,600,000", currency: "Kazakhstani Tenge", currencyCode: "KZT", usdValue: "0.0021", gdpPerCapita: 10370 },
  UZB: { name: "Uzbekistan", capital: "Tashkent", population: "35,600,000", currency: "Uzbekistani Som", currencyCode: "UZS", usdValue: "0.000079", gdpPerCapita: 2010 },
  MNG: { name: "Mongolia", capital: "Ulaanbaatar", population: "3,400,000", currency: "Mongolian Tögrög", currencyCode: "MNT", usdValue: "0.00029", gdpPerCapita: 4660 },
  MMR: { name: "Myanmar", capital: "Naypyidaw", population: "54,400,000", currency: "Myanmar Kyat", currencyCode: "MMK", usdValue: "0.00048", gdpPerCapita: 1210 },
  NPL: { name: "Nepal", capital: "Kathmandu", population: "30,900,000", currency: "Nepalese Rupee", currencyCode: "NPR", usdValue: "0.0075", gdpPerCapita: 1340 },
  LKA: { name: "Sri Lanka", capital: "Sri Jayawardenepura Kotte", population: "22,200,000", currency: "Sri Lankan Rupee", currencyCode: "LKR", usdValue: "0.0033", gdpPerCapita: 3830 },
  AFG: { name: "Afghanistan", capital: "Kabul", population: "41,100,000", currency: "Afghan Afghani", currencyCode: "AFN", usdValue: "0.014", gdpPerCapita: 380 },
  ECU: { name: "Ecuador", capital: "Quito", population: "18,000,000", currency: "US Dollar", currencyCode: "USD", usdValue: "1.00", gdpPerCapita: 6310 },
  BOL: { name: "Bolivia", capital: "Sucre", population: "12,200,000", currency: "Bolivian Boliviano", currencyCode: "BOB", usdValue: "0.14", gdpPerCapita: 3500 },
  PRY: { name: "Paraguay", capital: "Asunción", population: "7,400,000", currency: "Paraguayan Guaraní", currencyCode: "PYG", usdValue: "0.00013", gdpPerCapita: 5470 },
  URY: { name: "Uruguay", capital: "Montevideo", population: "3,400,000", currency: "Uruguayan Peso", currencyCode: "UYU", usdValue: "0.025", gdpPerCapita: 17020 },
  GUY: { name: "Guyana", capital: "Georgetown", population: "800,000", currency: "Guyanese Dollar", currencyCode: "GYD", usdValue: "0.0048", gdpPerCapita: 17690 },
  SUR: { name: "Suriname", capital: "Paramaribo", population: "620,000", currency: "Surinamese Dollar", currencyCode: "SRD", usdValue: "0.028", gdpPerCapita: 5450 },
  CRI: { name: "Costa Rica", capital: "San José", population: "5,200,000", currency: "Costa Rican Colón", currencyCode: "CRC", usdValue: "0.0019", gdpPerCapita: 12950 },
  PAN: { name: "Panama", capital: "Panama City", population: "4,400,000", currency: "Panamanian Balboa", currencyCode: "PAB", usdValue: "1.00", gdpPerCapita: 15730 },
  NIC: { name: "Nicaragua", capital: "Managua", population: "6,900,000", currency: "Nicaraguan Córdoba", currencyCode: "NIO", usdValue: "0.027", gdpPerCapita: 2150 },
  HND: { name: "Honduras", capital: "Tegucigalpa", population: "10,400,000", currency: "Honduran Lempira", currencyCode: "HNL", usdValue: "0.040", gdpPerCapita: 2830 },
  GTM: { name: "Guatemala", capital: "Guatemala City", population: "17,600,000", currency: "Guatemalan Quetzal", currencyCode: "GTQ", usdValue: "0.13", gdpPerCapita: 5470 },
  SLV: { name: "El Salvador", capital: "San Salvador", population: "6,300,000", currency: "US Dollar", currencyCode: "USD", usdValue: "1.00", gdpPerCapita: 4990 },
  DOM: { name: "Dominican Republic", capital: "Santo Domingo", population: "11,200,000", currency: "Dominican Peso", currencyCode: "DOP", usdValue: "0.017", gdpPerCapita: 10120 },
  CUB: { name: "Cuba", capital: "Havana", population: "11,100,000", currency: "Cuban Peso", currencyCode: "CUP", usdValue: "0.042", gdpPerCapita: 9500 },
  HTI: { name: "Haiti", capital: "Port-au-Prince", population: "11,700,000", currency: "Haitian Gourde", currencyCode: "HTG", usdValue: "0.0076", gdpPerCapita: 1830 },
  JAM: { name: "Jamaica", capital: "Kingston", population: "3,000,000", currency: "Jamaican Dollar", currencyCode: "JMD", usdValue: "0.0065", gdpPerCapita: 5990 },
  TTO: { name: "Trinidad and Tobago", capital: "Port of Spain", population: "1,500,000", currency: "Trinidad Dollar", currencyCode: "TTD", usdValue: "0.15", gdpPerCapita: 17870 },
  PRI: { name: "Puerto Rico", capital: "San Juan", population: "3,200,000", currency: "US Dollar", currencyCode: "USD", usdValue: "1.00", gdpPerCapita: 34060 },
  BIH: { name: "Bosnia and Herzegovina", capital: "Sarajevo", population: "3,200,000", currency: "Convertible Mark", currencyCode: "BAM", usdValue: "0.56", gdpPerCapita: 6880 },
  SRB: { name: "Serbia", capital: "Belgrade", population: "6,600,000", currency: "Serbian Dinar", currencyCode: "RSD", usdValue: "0.0093", gdpPerCapita: 9230 },
  HRV: { name: "Croatia", capital: "Zagreb", population: "3,900,000", currency: "Euro", currencyCode: "EUR", usdValue: "1.09", gdpPerCapita: 17680 },
  SVN: { name: "Slovenia", capital: "Ljubljana", population: "2,100,000", currency: "Euro", currencyCode: "EUR", usdValue: "1.09", gdpPerCapita: 28880 },
  SVK: { name: "Slovakia", capital: "Bratislava", population: "5,400,000", currency: "Euro", currencyCode: "EUR", usdValue: "1.09", gdpPerCapita: 21260 },
  CZE: { name: "Czech Republic", capital: "Prague", population: "10,800,000", currency: "Czech Koruna", currencyCode: "CZK", usdValue: "0.044", gdpPerCapita: 27180 },
  HUN: { name: "Hungary", capital: "Budapest", population: "9,700,000", currency: "Hungarian Forint", currencyCode: "HUF", usdValue: "0.0028", gdpPerCapita: 18390 },
  BGR: { name: "Bulgaria", capital: "Sofia", population: "6,500,000", currency: "Bulgarian Lev", currencyCode: "BGN", usdValue: "0.56", gdpPerCapita: 12310 },
  MDA: { name: "Moldova", capital: "Chișinău", population: "2,600,000", currency: "Moldovan Leu", currencyCode: "MDL", usdValue: "0.056", gdpPerCapita: 5570 },
  MNE: { name: "Montenegro", capital: "Podgorica", population: "620,000", currency: "Euro", currencyCode: "EUR", usdValue: "1.09", gdpPerCapita: 9760 },
  ISL: { name: "Iceland", capital: "Reykjavík", population: "380,000", currency: "Icelandic Króna", currencyCode: "ISK", usdValue: "0.0073", gdpPerCapita: 73460 },
  IRL: { name: "Ireland", capital: "Dublin", population: "5,100,000", currency: "Euro", currencyCode: "EUR", usdValue: "1.09", gdpPerCapita: 100170 },
  LTU: { name: "Lithuania", capital: "Vilnius", population: "2,800,000", currency: "Euro", currencyCode: "EUR", usdValue: "1.09", gdpPerCapita: 23720 },
  EST: { name: "Estonia", capital: "Tallinn", population: "1,300,000", currency: "Euro", currencyCode: "EUR", usdValue: "1.09", gdpPerCapita: 27280 },
  LVA: { name: "Latvia", capital: "Riga", population: "1,800,000", currency: "Euro", currencyCode: "EUR", usdValue: "1.09", gdpPerCapita: 21150 },
  BLR: { name: "Belarus", capital: "Minsk", population: "9,200,000", currency: "Belarusian Ruble", currencyCode: "BYN", usdValue: "0.31", gdpPerCapita: 7310 },
  GEO: { name: "Georgia", capital: "Tbilisi", population: "3,700,000", currency: "Georgian Lari", currencyCode: "GEL", usdValue: "0.37", gdpPerCapita: 5020 },
  ARM: { name: "Armenia", capital: "Yerevan", population: "3,000,000", currency: "Armenian Dram", currencyCode: "AMD", usdValue: "0.0026", gdpPerCapita: 4980 },
  AZE: { name: "Azerbaijan", capital: "Baku", population: "10,200,000", currency: "Azerbaijani Manat", currencyCode: "AZN", usdValue: "0.59", gdpPerCapita: 6680 },
  TKM: { name: "Turkmenistan", capital: "Ashgabat", population: "6,300,000", currency: "Turkmenistani Manat", currencyCode: "TMT", usdValue: "0.29", gdpPerCapita: 8550 },
  TJK: { name: "Tajikistan", capital: "Dushanbe", population: "10,000,000", currency: "Tajikistani Somoni", currencyCode: "TJS", usdValue: "0.091", gdpPerCapita: 870 },
  KGZ: { name: "Kyrgyzstan", capital: "Bishkek", population: "6,800,000", currency: "Kyrgyzstani Som", currencyCode: "KGS", usdValue: "0.011", gdpPerCapita: 1380 },
  KHM: { name: "Cambodia", capital: "Phnom Penh", population: "16,900,000", currency: "Cambodian Riel", currencyCode: "KHR", usdValue: "0.00024", gdpPerCapita: 1790 },
  LAO: { name: "Laos", capital: "Vientiane", population: "7,500,000", currency: "Lao Kip", currencyCode: "LAK", usdValue: "0.000047", gdpPerCapita: 2590 },
  COG: { name: "Republic of the Congo", capital: "Brazzaville", population: "6,000,000", currency: "Central African CFA Franc", currencyCode: "XAF", usdValue: "0.0017", gdpPerCapita: 2180 },
  COD: { name: "DR Congo", capital: "Kinshasa", population: "102,300,000", currency: "Congolese Franc", currencyCode: "CDF", usdValue: "0.00036", gdpPerCapita: 580 },
  CMR: { name: "Cameroon", capital: "Yaoundé", population: "27,900,000", currency: "Central African CFA Franc", currencyCode: "XAF", usdValue: "0.0017", gdpPerCapita: 1660 },
  CAF: { name: "Central African Republic", capital: "Bangui", population: "5,600,000", currency: "Central African CFA Franc", currencyCode: "XAF", usdValue: "0.0017", gdpPerCapita: 480 },
  TCD: { name: "Chad", capital: "N'Djamena", population: "17,400,000", currency: "Central African CFA Franc", currencyCode: "XAF", usdValue: "0.0017", gdpPerCapita: 700 },
  NER: { name: "Niger", capital: "Niamey", population: "26,200,000", currency: "West African CFA Franc", currencyCode: "XOF", usdValue: "0.0017", gdpPerCapita: 560 },
  MLI: { name: "Mali", capital: "Bamako", population: "22,400,000", currency: "West African CFA Franc", currencyCode: "XOF", usdValue: "0.0017", gdpPerCapita: 890 },
  BFA: { name: "Burkina Faso", capital: "Ouagadougou", population: "22,700,000", currency: "West African CFA Franc", currencyCode: "XOF", usdValue: "0.0017", gdpPerCapita: 830 },
  SEN: { name: "Senegal", capital: "Dakar", population: "17,700,000", currency: "West African CFA Franc", currencyCode: "XOF", usdValue: "0.0017", gdpPerCapita: 1640 },
  CIV: { name: "Côte d'Ivoire", capital: "Yamoussoukro", population: "28,200,000", currency: "West African CFA Franc", currencyCode: "XOF", usdValue: "0.0017", gdpPerCapita: 2490 },
  AGO: { name: "Angola", capital: "Luanda", population: "35,600,000", currency: "Angolan Kwanza", currencyCode: "AOA", usdValue: "0.0012", gdpPerCapita: 3060 },
  MOZ: { name: "Mozambique", capital: "Maputo", population: "33,000,000", currency: "Mozambican Metical", currencyCode: "MZN", usdValue: "0.016", gdpPerCapita: 490 },
  ZMB: { name: "Zambia", capital: "Lusaka", population: "20,000,000", currency: "Zambian Kwacha", currencyCode: "ZMW", usdValue: "0.039", gdpPerCapita: 1290 },
  ZWE: { name: "Zimbabwe", capital: "Harare", population: "16,300,000", currency: "Zimbabwean Dollar", currencyCode: "ZWL", usdValue: "0.0031", gdpPerCapita: 1770 },
  BWA: { name: "Botswana", capital: "Gaborone", population: "2,600,000", currency: "Botswana Pula", currencyCode: "BWP", usdValue: "0.074", gdpPerCapita: 7740 },
  NAM: { name: "Namibia", capital: "Windhoek", population: "2,500,000", currency: "Namibian Dollar", currencyCode: "NAD", usdValue: "0.055", gdpPerCapita: 4760 },
  SWZ: { name: "Eswatini", capital: "Mbabane", population: "1,200,000", currency: "Swazi Lilangeni", currencyCode: "SZL", usdValue: "0.055", gdpPerCapita: 3990 },
  LSO: { name: "Lesotho", capital: "Maseru", population: "2,300,000", currency: "Lesotho Loti", currencyCode: "LSL", usdValue: "0.055", gdpPerCapita: 1120 },
  MDG: { name: "Madagascar", capital: "Antananarivo", population: "29,600,000", currency: "Malagasy Ariary", currencyCode: "MGA", usdValue: "0.00022", gdpPerCapita: 530 },
  MWI: { name: "Malawi", capital: "Lilongwe", population: "20,400,000", currency: "Malawian Kwacha", currencyCode: "MWK", usdValue: "0.00058", gdpPerCapita: 640 },
  RWA: { name: "Rwanda", capital: "Kigali", population: "13,800,000", currency: "Rwandan Franc", currencyCode: "RWF", usdValue: "0.00078", gdpPerCapita: 960 },
  UGA: { name: "Uganda", capital: "Kampala", population: "47,200,000", currency: "Ugandan Shilling", currencyCode: "UGX", usdValue: "0.00027", gdpPerCapita: 960 },
  SOM: { name: "Somalia", capital: "Mogadishu", population: "17,600,000", currency: "Somali Shilling", currencyCode: "SOS", usdValue: "0.0018", gdpPerCapita: 450 },
  SDN: { name: "Sudan", capital: "Khartoum", population: "46,900,000", currency: "Sudanese Pound", currencyCode: "SDG", usdValue: "0.0017", gdpPerCapita: 510 },
  SSD: { name: "South Sudan", capital: "Juba", population: "11,400,000", currency: "South Sudanese Pound", currencyCode: "SSP", usdValue: "0.0015", gdpPerCapita: 420 },
  ERI: { name: "Eritrea", capital: "Asmara", population: "3,700,000", currency: "Eritrean Nakfa", currencyCode: "ERN", usdValue: "0.067", gdpPerCapita: 640 },
  DJI: { name: "Djibouti", capital: "Djibouti City", population: "1,100,000", currency: "Djiboutian Franc", currencyCode: "DJF", usdValue: "0.0056", gdpPerCapita: 3310 },
  GNQ: { name: "Equatorial Guinea", capital: "Malabo", population: "1,700,000", currency: "Central African CFA Franc", currencyCode: "XAF", usdValue: "0.0017", gdpPerCapita: 8140 },
  GAB: { name: "Gabon", capital: "Libreville", population: "2,400,000", currency: "Central African CFA Franc", currencyCode: "XAF", usdValue: "0.0017", gdpPerCapita: 8640 },
  LBY: { name: "Libya", capital: "Tripoli", population: "7,000,000", currency: "Libyan Dinar", currencyCode: "LYD", usdValue: "0.21", gdpPerCapita: 6360 },
  TUN: { name: "Tunisia", capital: "Tunis", population: "12,000,000", currency: "Tunisian Dinar", currencyCode: "TND", usdValue: "0.32", gdpPerCapita: 3810 },
  OMN: { name: "Oman", capital: "Muscat", population: "4,600,000", currency: "Omani Rial", currencyCode: "OMR", usdValue: "2.60", gdpPerCapita: 21000 },
  QAT: { name: "Qatar", capital: "Doha", population: "2,700,000", currency: "Qatari Riyal", currencyCode: "QAR", usdValue: "0.27", gdpPerCapita: 83890 },
  KWT: { name: "Kuwait", capital: "Kuwait City", population: "4,300,000", currency: "Kuwaiti Dinar", currencyCode: "KWD", usdValue: "3.26", gdpPerCapita: 38420 },
  BHR: { name: "Bahrain", capital: "Manama", population: "1,500,000", currency: "Bahraini Dinar", currencyCode: "BHD", usdValue: "2.65", gdpPerCapita: 29100 },
  JOR: { name: "Jordan", capital: "Amman", population: "11,500,000", currency: "Jordanian Dinar", currencyCode: "JOD", usdValue: "1.41", gdpPerCapita: 4300 },
  LBN: { name: "Lebanon", capital: "Beirut", population: "5,500,000", currency: "Lebanese Pound", currencyCode: "LBP", usdValue: "0.000011", gdpPerCapita: 4140 },
  SYR: { name: "Syria", capital: "Damascus", population: "22,100,000", currency: "Syrian Pound", currencyCode: "SYP", usdValue: "0.000077", gdpPerCapita: 530 },
  YEM: { name: "Yemen", capital: "Sana'a", population: "33,700,000", currency: "Yemeni Rial", currencyCode: "YER", usdValue: "0.0040", gdpPerCapita: 670 },
  PNG: { name: "Papua New Guinea", capital: "Port Moresby", population: "10,100,000", currency: "Papua New Guinean Kina", currencyCode: "PGK", usdValue: "0.26", gdpPerCapita: 2670 },
  FJI: { name: "Fiji", capital: "Suva", population: "930,000", currency: "Fijian Dollar", currencyCode: "FJD", usdValue: "0.44", gdpPerCapita: 5320 },
  SLB: { name: "Solomon Islands", capital: "Honiara", population: "720,000", currency: "Solomon Islands Dollar", currencyCode: "SBD", usdValue: "0.12", gdpPerCapita: 2350 },
  GRL: { name: "Greenland", capital: "Nuuk", population: "56,000", currency: "Danish Krone", currencyCode: "DKK", usdValue: "0.15", gdpPerCapita: 52200 },
  LBR: { name: "Liberia", capital: "Monrovia", population: "5,300,000", currency: "Liberian Dollar", currencyCode: "LRD", usdValue: "0.0052", gdpPerCapita: 660 },
  SLE: { name: "Sierra Leone", capital: "Freetown", population: "8,600,000", currency: "Sierra Leonean Leone", currencyCode: "SLL", usdValue: "0.000045", gdpPerCapita: 510 },
  GIN: { name: "Guinea", capital: "Conakry", population: "13,900,000", currency: "Guinean Franc", currencyCode: "GNF", usdValue: "0.00012", gdpPerCapita: 1190 },
  GNB: { name: "Guinea-Bissau", capital: "Bissau", population: "2,100,000", currency: "West African CFA Franc", currencyCode: "XOF", usdValue: "0.0017", gdpPerCapita: 770 },
  GMB: { name: "Gambia", capital: "Banjul", population: "2,600,000", currency: "Gambian Dalasi", currencyCode: "GMD", usdValue: "0.014", gdpPerCapita: 780 },
  MRT: { name: "Mauritania", capital: "Nouakchott", population: "4,700,000", currency: "Mauritanian Ouguiya", currencyCode: "MRU", usdValue: "0.025", gdpPerCapita: 2170 },
  BEN: { name: "Benin", capital: "Porto-Novo", population: "13,400,000", currency: "West African CFA Franc", currencyCode: "XOF", usdValue: "0.0017", gdpPerCapita: 1400 },
  TGO: { name: "Togo", capital: "Lomé", population: "8,800,000", currency: "West African CFA Franc", currencyCode: "XOF", usdValue: "0.0017", gdpPerCapita: 920 },
  BDI: { name: "Burundi", capital: "Gitega", population: "12,900,000", currency: "Burundian Franc", currencyCode: "BIF", usdValue: "0.00035", gdpPerCapita: 240 },
};

// Color palette for countries
const COUNTRY_COLORS = [
  "hsl(170, 50%, 45%)", "hsl(200, 55%, 50%)", "hsl(30, 60%, 55%)",
  "hsl(340, 45%, 55%)", "hsl(260, 40%, 55%)", "hsl(90, 40%, 45%)",
  "hsl(15, 55%, 50%)", "hsl(180, 45%, 40%)", "hsl(220, 50%, 55%)",
  "hsl(50, 55%, 50%)", "hsl(300, 35%, 50%)", "hsl(140, 45%, 42%)",
  "hsl(0, 45%, 52%)", "hsl(240, 40%, 55%)", "hsl(60, 45%, 48%)",
  "hsl(120, 35%, 45%)", "hsl(330, 40%, 50%)", "hsl(280, 35%, 52%)",
  "hsl(45, 50%, 52%)", "hsl(190, 45%, 48%)",
];

export function getCountryColor(index: number): string {
  return COUNTRY_COLORS[index % COUNTRY_COLORS.length];
}

// Parse population string to number
function parsePopulation(pop: string): number {
  return parseInt(pop.replace(/,/g, ""), 10) || 0;
}

// Heatmap color based on population
const HEATMAP_STOPS = [
  { threshold: 0,           color: "hsl(210, 30%, 60%)" },
  { threshold: 1_000_000,   color: "hsl(180, 40%, 50%)" },
  { threshold: 10_000_000,  color: "hsl(120, 40%, 45%)" },
  { threshold: 50_000_000,  color: "hsl(60, 55%, 50%)" },
  { threshold: 100_000_000, color: "hsl(30, 65%, 50%)" },
  { threshold: 500_000_000, color: "hsl(0, 60%, 45%)" },
  { threshold: 1_000_000_000, color: "hsl(340, 70%, 35%)" },
];

export const HEATMAP_LEGEND = HEATMAP_STOPS.map((s, i, arr) => ({
  color: s.color,
  label: i === arr.length - 1
    ? `${(s.threshold / 1e6).toFixed(0)}M+`
    : `${s.threshold < 1e6 ? "<1M" : (s.threshold / 1e6).toFixed(0) + "M"}`,
}));

export function getHeatmapColor(alpha3: string): string {
  const info = countryData[alpha3];
  if (!info) return "hsl(210, 20%, 35%)";
  const pop = parsePopulation(info.population);
  let color = HEATMAP_STOPS[0].color;
  for (const stop of HEATMAP_STOPS) {
    if (pop >= stop.threshold) color = stop.color;
  }
  return color;
}

// GDP per capita heatmap
const GDP_STOPS = [
  { threshold: 0,      color: "hsl(0, 50%, 40%)" },
  { threshold: 1000,   color: "hsl(20, 55%, 45%)" },
  { threshold: 5000,   color: "hsl(40, 60%, 50%)" },
  { threshold: 15000,  color: "hsl(60, 55%, 50%)" },
  { threshold: 30000,  color: "hsl(100, 45%, 45%)" },
  { threshold: 50000,  color: "hsl(150, 50%, 40%)" },
  { threshold: 80000,  color: "hsl(180, 55%, 35%)" },
];

export const GDP_HEATMAP_LEGEND = GDP_STOPS.map((s, i, arr) => ({
  color: s.color,
  label: i === arr.length - 1
    ? `$${(s.threshold / 1000).toFixed(0)}k+`
    : `${s.threshold < 1000 ? "<$1k" : "$" + (s.threshold / 1000).toFixed(0) + "k"}`,
}));

export function getGdpHeatmapColor(alpha3: string): string {
  const info = countryData[alpha3];
  if (!info) return "hsl(210, 20%, 35%)";
  const gdp = info.gdpPerCapita;
  let color = GDP_STOPS[0].color;
  for (const stop of GDP_STOPS) {
    if (gdp >= stop.threshold) color = stop.color;
  }
  return color;
}
