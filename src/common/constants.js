import _ from 'lodash';

const countries = [
  { value: 'USA', label: 'United States' },
  { value: 'AFG', label: 'Afghanistan' },
  { value: 'ALB', label: 'Albania' },
  { value: 'DZA', label: 'Algeria' },
  { value: 'AND', label: 'Andorra' },
  { value: 'AGO', label: 'Angola' },
  { value: 'AIA', label: 'Anguilla' },
  { value: 'ATA', label: 'Antarctica' },
  { value: 'ATG', label: 'Antigua' },
  { value: 'ARG', label: 'Argentina' },
  { value: 'ARM', label: 'Armenia' },
  { value: 'ABW', label: 'Aruba' },
  { value: 'AUS', label: 'Australia' },
  { value: 'AUT', label: 'Austria' },
  { value: 'AZE', label: 'Azerbaijan' },
  { value: 'BHS', label: 'Bahamas' },
  { value: 'BHR', label: 'Bahrain' },
  { value: 'BGD', label: 'Bangladesh' },
  { value: 'BRB', label: 'Barbados' },
  { value: 'BLR', label: 'Belarus' },
  { value: 'BEL', label: 'Belgium' },
  { value: 'BLZ', label: 'Belize' },
  { value: 'BEN', label: 'Benin' },
  { value: 'BMU', label: 'Bermuda' },
  { value: 'BTN', label: 'Bhutan' },
  { value: 'BOL', label: 'Bolivia' },
  { value: 'BIH', label: 'Bosnia' },
  { value: 'BWA', label: 'Botswana' },
  { value: 'BVT', label: 'Bouvet Island' },
  { value: 'BRA', label: 'Brazil' },
  { value: 'IOT', label: 'British Indian Ocean Territories' },
  { value: 'BRN', label: 'Brunei Darussalam' },
  { value: 'BGR', label: 'Bulgaria' },
  { value: 'BFA', label: 'Burkina Faso' },
  { value: 'BDI', label: 'Burundi' },
  { value: 'KHM', label: 'Cambodia' },
  { value: 'CMR', label: 'Cameroon' },
  { value: 'CAN', label: 'Canada' },
  { value: 'CPV', label: 'Cape Verde' },
  { value: 'CYM', label: 'Cayman' },
  { value: 'CAF', label: 'Central African Republic' },
  { value: 'TCD', label: 'Chad' },
  { value: 'CHL', label: 'Chile' },
  { value: 'CHN', label: 'China' },
  { value: 'CXR', label: 'Christmas Island' },
  { value: 'CCK', label: 'Cocos Islands' },
  { value: 'COL', label: 'Colombia' },
  { value: 'COM', label: 'Comoros' },
  { value: 'COG', label: 'Congo' },
  { value: 'COD', label: 'Democratic Republic of the Congo' },
  { value: 'COK', label: 'Cook Islands' },
  { value: 'CRI', label: 'Costa Rica' },
  { value: 'CIV', label: 'Ivory Coast' },
  { value: 'HRV', label: 'Croatia' },
  { value: 'CUB', label: 'Cuba' },
  { value: 'CYP', label: 'Cyprus' },
  { value: 'CZE', label: 'Czech Republic' },
  { value: 'DNK', label: 'Denmark' },
  { value: 'DJI', label: 'Djibouti' },
  { value: 'DMA', label: 'Dominica' },
  { value: 'DOM', label: 'Dominican Republic' },
  { value: 'ECU', label: 'Ecuador' },
  { value: 'EGY', label: 'Egypt' },
  { value: 'SLV', label: 'El Salvador' },
  { value: 'GNQ', label: 'Equatorial Guinea' },
  { value: 'ERI', label: 'Eritrea' },
  { value: 'EST', label: 'Estonia' },
  { value: 'ETH', label: 'Ethiopia' },
  { value: 'FLK', label: 'Falkland Islands' },
  { value: 'FRO', label: 'Faroe Islands' },
  { value: 'FJI', label: 'Fiji' },
  { value: 'FIN', label: 'Finland' },
  { value: 'FRA', label: 'France' },
  { value: 'GUF', label: 'French Guiana' },
  { value: 'PYF', label: 'French Polynesia' },
  { value: 'ATF', label: 'French Southern Territories' },
  { value: 'GAB', label: 'Gabon' },
  { value: 'GMB', label: 'Gambia' },
  { value: 'GEO', label: 'Georgia' },
  { value: 'DEU', label: 'Germany' },
  { value: 'GHA', label: 'Ghana' },
  { value: 'GIB', label: 'Gibraltar' },
  { value: 'GRC', label: 'Greece' },
  { value: 'GRL', label: 'Greenland' },
  { value: 'GRD', label: 'Grenada' },
  { value: 'GLP', label: 'Guadeloupe' },
  { value: 'GTM', label: 'Guatemala' },
  { value: 'GIN', label: 'Guinea' },
  { value: 'GNB', label: 'Guinea-Bissau' },
  { value: 'GUY', label: 'Guyana' },
  { value: 'HTI', label: 'Haiti' },
  { value: 'HMD', label: 'Heard Island' },
  { value: 'HND', label: 'Honduras' },
  { value: 'HKG', label: 'Hong Kong' },
  { value: 'HUN', label: 'Hungary' },
  { value: 'ISL', label: 'Iceland' },
  { value: 'IND', label: 'India' },
  { value: 'IDN', label: 'Indonesia' },
  { value: 'IRN', label: 'Iran' },
  { value: 'IRQ', label: 'Iraq' },
  { value: 'IRL', label: 'Ireland' },
  { value: 'ISR', label: 'Israel' },
  { value: 'ITA', label: 'Italy' },
  { value: 'JAM', label: 'Jamaica' },
  { value: 'JPN', label: 'Japan' },
  { value: 'JOR', label: 'Jordan' },
  { value: 'KAZ', label: 'Kazakhstan' },
  { value: 'KEN', label: 'Kenya' },
  { value: 'KIR', label: 'Kiribati' },
  { value: 'PRK', label: 'North Korea' },
  { value: 'KOR', label: 'South Korea' },
  { value: 'KWT', label: 'Kuwait' },
  { value: 'KGZ', label: 'Kyrgyzstan' },
  { value: 'LAO', label: 'Laos' },
  { value: 'LVA', label: 'Latvia' },
  { value: 'LBN', label: 'Lebanon' },
  { value: 'LSO', label: 'Lesotho' },
  { value: 'LBR', label: 'Liberia' },
  { value: 'LBY', label: 'Libya' },
  { value: 'LIE', label: 'Liechtenstein' },
  { value: 'LTU', label: 'Lithuania' },
  { value: 'LUX', label: 'Luxembourg' },
  { value: 'MAC', label: 'Macao' },
  { value: 'MKD', label: 'Macedonia' },
  { value: 'MDG', label: 'Madagascar' },
  { value: 'MWI', label: 'Malawi' },
  { value: 'MYS', label: 'Malaysia' },
  { value: 'MDV', label: 'Maldives' },
  { value: 'MLI', label: 'Mali' },
  { value: 'MLT', label: 'Malta' },
  { value: 'MTQ', label: 'Martinique' },
  { value: 'MRT', label: 'Mauritania' },
  { value: 'MUS', label: 'Mauritius' },
  { value: 'MYT', label: 'Mayotte' },
  { value: 'MEX', label: 'Mexico' },
  { value: 'FSM', label: 'Micronesia' },
  { value: 'MDA', label: 'Moldova' },
  { value: 'MCO', label: 'Monaco' },
  { value: 'MNG', label: 'Mongolia' },
  { value: 'MSR', label: 'Montserrat' },
  { value: 'MAR', label: 'Morocco' },
  { value: 'MOZ', label: 'Mozambique' },
  { value: 'MMR', label: 'Myanmar' },
  { value: 'NAM', label: 'Namibia' },
  { value: 'NRU', label: 'Nauru' },
  { value: 'NPL', label: 'Nepal' },
  { value: 'ANT', label: 'Netherlands Antilles' },
  { value: 'NLD', label: 'Netherlands' },
  { value: 'NCL', label: 'New Caledonia' },
  { value: 'NZL', label: 'New Zealand' },
  { value: 'NIC', label: 'Nicaragua' },
  { value: 'NER', label: 'Niger' },
  { value: 'NGA', label: 'Nigeria' },
  { value: 'NIU', label: 'Niue' },
  { value: 'NFK', label: 'Norfolk' },
  { value: 'NOR', label: 'Norway' },
  { value: 'OMN', label: 'Oman' },
  { value: 'PAK', label: 'Pakistan' },
  { value: 'PAN', label: 'Panama' },
  { value: 'PNG', label: 'Papua New Guinea' },
  { value: 'PRY', label: 'Paraguay' },
  { value: 'PER', label: 'Peru' },
  { value: 'PHL', label: 'Philippines' },
  { value: 'PCN', label: 'Pitcairn' },
  { value: 'POL', label: 'Poland' },
  { value: 'PRT', label: 'Portugal' },
  { value: 'QAT', label: 'Qatar' },
  { value: 'REU', label: 'Reunion' },
  { value: 'ROU', label: 'Romania' },
  { value: 'RUS', label: 'Russia' },
  { value: 'RWA', label: 'Rwanda' },
  { value: 'SHN', label: 'Saint Helena' },
  { value: 'KNA', label: 'Saint Kitts and Nevis' },
  { value: 'LCA', label: 'Saint Lucia' },
  { value: 'SPM', label: 'Saint Pierre and Miquelon' },
  { value: 'VCT', label: 'Saint Vincent and the Grenadines' },
  { value: 'SMR', label: 'San Marino' },
  { value: 'STP', label: 'Sao Tome and Principe' },
  { value: 'SAU', label: 'Saudi Arabia' },
  { value: 'SEN', label: 'Senegal' },
  { value: 'SCG', label: 'Serbia' },
  { value: 'SYC', label: 'Seychelles' },
  { value: 'SLE', label: 'Sierra Leone' },
  { value: 'SGP', label: 'Singapore' },
  { value: 'SVK', label: 'Slovakia' },
  { value: 'SVN', label: 'Slovenia' },
  { value: 'SLB', label: 'Solomon Islands' },
  { value: 'SOM', label: 'Somalia' },
  { value: 'ZAF', label: 'South Africa' },
  { value: 'SGS', label: 'South Georgia and the South Sandwich Islands' },
  { value: 'ESP', label: 'Spain' },
  { value: 'LKA', label: 'Sri Lanka' },
  { value: 'SDN', label: 'Sudan' },
  { value: 'SUR', label: 'Suriname' },
  { value: 'SWZ', label: 'Swaziland' },
  { value: 'SWE', label: 'Sweden' },
  { value: 'CHE', label: 'Switzerland' },
  { value: 'SYR', label: 'Syrian Arab Republic' },
  { value: 'TWN', label: 'Taiwan' },
  { value: 'TJK', label: 'Tajikistan' },
  { value: 'TZA', label: 'Tanzania' },
  { value: 'THA', label: 'Thailand' },
  { value: 'TLS', label: 'Timor-Leste' },
  { value: 'TGO', label: 'Togo' },
  { value: 'TKL', label: 'Tokelau' },
  { value: 'TON', label: 'Tonga' },
  { value: 'TTO', label: 'Trinidad and Tobago' },
  { value: 'TUN', label: 'Tunisia' },
  { value: 'TUR', label: 'Turkey' },
  { value: 'TKM', label: 'Turkmenistan' },
  { value: 'TCA', label: 'Turks and Caicos Islands' },
  { value: 'TUV', label: 'Tuvalu' },
  { value: 'UGA', label: 'Uganda' },
  { value: 'UKR', label: 'Ukraine' },
  { value: 'ARE', label: 'United Arab Emirates' },
  { value: 'GBR', label: 'United Kingdom' },
  { value: 'URY', label: 'Uruguay' },
  { value: 'UZB', label: 'Uzbekistan' },
  { value: 'VUT', label: 'Vanuatu' },
  { value: 'VAT', label: 'Vatican' },
  { value: 'VEN', label: 'Venezuela' },
  { value: 'VNM', label: 'Vietnam' },
  { value: 'VGB', label: 'British Virgin Islands' },
  { value: 'WLF', label: 'Wallis and Futuna' },
  { value: 'ESH', label: 'Western Sahara' },
  { value: 'YEM', label: 'Yemen' },
  { value: 'ZMB', label: 'Zambia' },
  { value: 'ZWE', label: 'Zimbabwe' }
];

const salesforceCountries = [
  {
    "label": "Afghanistan",
    "value": "AFG"
  },
  {
    "label": "Aland Islands",
    "value": "ALA"
  },
  {
    "label": "Albania",
    "value": "ALB"
  },
  {
    "label": "Algeria",
    "value": "DZA"
  },
  {
    "label": "Andorra",
    "value": "AND"
  },
  {
    "label": "Angola",
    "value": "AGO"
  },
  {
    "label": "Anguilla",
    "value": "AIA"
  },
  {
    "label": "Antarctica",
    "value": "ATA"
  },
  {
    "label": "Antigua and Barbuda",
    "value": "ATG"
  },
  {
    "label": "Argentina",
    "value": "ARG"
  },
  {
    "label": "Armenia",
    "value": "ARM"
  },
  {
    "label": "Aruba",
    "value": "ABW"
  },
  {
    "label": "Australia",
    "value": "AUS"
  },
  {
    "label": "Austria",
    "value": "AUT"
  },
  {
    "label": "Azerbaijan",
    "value": "AZE"
  },
  {
    "label": "Bahamas",
    "value": "BHS"
  },
  {
    "label": "Bahrain",
    "value": "BHR"
  },
  {
    "label": "Bangladesh",
    "value": "BGD"
  },
  {
    "label": "Barbados",
    "value": "BRB"
  },
  {
    "label": "Belarus",
    "value": "BLR"
  },
  {
    "label": "Belgium",
    "value": "BEL"
  },
  {
    "label": "Belize",
    "value": "BLZ"
  },
  {
    "label": "Benin",
    "value": "BEN"
  },
  {
    "label": "Bermuda",
    "value": "BMU"
  },
  {
    "label": "Bhutan",
    "value": "BTN"
  },
  {
    "label": "Bolivia, Plurinational State of",
    "value": "BOL"
  },
  {
    "label": "Bonaire, Sint Eustatius and Saba",
    "value": "BES"
  },
  {
    "label": "Bosnia and Herzegovina",
    "value": "BIH"
  },
  {
    "label": "Botswana",
    "value": "BWA"
  },
  {
    "label": "Bouvet Island",
    "value": "BVT"
  },
  {
    "label": "Brazil",
    "value": "BRA"
  },
  {
    "label": "British Indian Ocean Territory",
    "value": "IOT"
  },
  {
    "label": "Brunei Darussalam",
    "value": "BRN"
  },
  {
    "label": "Bulgaria",
    "value": "BGR"
  },
  {
    "label": "Burkina Faso",
    "value": "BFA"
  },
  {
    "label": "Burundi",
    "value": "BDI"
  },
  {
    "label": "Cambodia",
    "value": "KHM"
  },
  {
    "label": "Cameroon",
    "value": "CMR"
  },
  {
    "label": "Canada",
    "value": "CAN"
  },
  {
    "label": "Cape Verde",
    "value": "CPV"
  },
  {
    "label": "Cayman Islands",
    "value": "CYM"
  },
  {
    "label": "Central African Republic",
    "value": "CAF"
  },
  {
    "label": "Chad",
    "value": "TCD"
  },
  {
    "label": "Chile",
    "value": "CHL"
  },
  {
    "label": "China",
    "value": "CHN"
  },
  {
    "label": "Chinese Taipei",
    "value": "TWN"
  },
  {
    "label": "Christmas Island",
    "value": "CXR"
  },
  {
    "label": "Cocos (Keeling) Islands",
    "value": "CCK"
  },
  {
    "label": "Colombia",
    "value": "COL"
  },
  {
    "label": "Comoros",
    "value": "COM"
  },
  {
    "label": "Congo",
    "value": "COG"
  },
  {
    "label": "Congo, the Democratic Republic of the",
    "value": "COD"
  },
  {
    "label": "Cook Islands",
    "value": "COK"
  },
  {
    "label": "Costa Rica",
    "value": "CRI"
  },
  {
    "label": "Cote d'Ivoire",
    "value": "CIV"
  },
  {
    "label": "Croatia",
    "value": "HRV"
  },
  {
    "label": "Cuba",
    "value": "CUB"
  },
  {
    "label": "Curaçao",
    "value": "CUW"
  },
  {
    "label": "Cyprus",
    "value": "CYP"
  },
  {
    "label": "Czech Republic",
    "value": "CZE"
  },
  {
    "label": "Denmark",
    "value": "DNK"
  },
  {
    "label": "Djibouti",
    "value": "DJI"
  },
  {
    "label": "Dominica",
    "value": "DMA"
  },
  {
    "label": "Dominican Republic",
    "value": "DOM"
  },
  {
    "label": "Ecuador",
    "value": "ECU"
  },
  {
    "label": "Egypt",
    "value": "EGY"
  },
  {
    "label": "El Salvador",
    "value": "SLV"
  },
  {
    "label": "Equatorial Guinea",
    "value": "GNQ"
  },
  {
    "label": "Eritrea",
    "value": "ERI"
  },
  {
    "label": "Estonia",
    "value": "EST"
  },
  {
    "label": "Ethiopia",
    "value": "ETH"
  },
  {
    "label": "Falkland Islands (Malvinas)",
    "value": "FLK"
  },
  {
    "label": "Faroe Islands",
    "value": "FRO"
  },
  {
    "label": "Fiji",
    "value": "FJI"
  },
  {
    "label": "Finland",
    "value": "FIN"
  },
  {
    "label": "France",
    "value": "FRA"
  },
  {
    "label": "French Guiana",
    "value": "GUF"
  },
  {
    "label": "French Polynesia",
    "value": "PYF"
  },
  {
    "label": "French Southern Territories",
    "value": "ATF"
  },
  {
    "label": "Gabon",
    "value": "GAB"
  },
  {
    "label": "Gambia",
    "value": "GMB"
  },
  {
    "label": "Georgia",
    "value": "GEO"
  },
  {
    "label": "Germany",
    "value": "DEU"
  },
  {
    "label": "Ghana",
    "value": "GHA"
  },
  {
    "label": "Gibraltar",
    "value": "GIB"
  },
  {
    "label": "Greece",
    "value": "GRC"
  },
  {
    "label": "Greenland",
    "value": "GRL"
  },
  {
    "label": "Grenada",
    "value": "GRD"
  },
  {
    "label": "Guadeloupe",
    "value": "GLP"
  },
  {
    "label": "Guatemala",
    "value": "GTM"
  },
  {
    "label": "Guernsey",
    "value": "GGY"
  },
  {
    "label": "Guinea",
    "value": "GIN"
  },
  {
    "label": "Guinea-Bissau",
    "value": "GNB"
  },
  {
    "label": "Guyana",
    "value": "GUY"
  },
  {
    "label": "Haiti",
    "value": "HTI"
  },
  {
    "label": "Heard Island and McDonald Islands",
    "value": "HMD"
  },
  {
    "label": "Holy See (Vatican City State)",
    "value": "VAT"
  },
  {
    "label": "Honduras",
    "value": "HND"
  },
  {
    "label": "Hungary",
    "value": "HUN"
  },
  {
    "label": "Iceland",
    "value": "ISL"
  },
  {
    "label": "India",
    "value": "IND"
  },
  {
    "label": "Indonesia",
    "value": "IDN"
  },
  {
    "label": "Iran, Islamic Republic of",
    "value": "IRN"
  },
  {
    "label": "Iraq",
    "value": "IRQ"
  },
  {
    "label": "Ireland",
    "value": "IRL"
  },
  {
    "label": "Isle of Man",
    "value": "IMN"
  },
  {
    "label": "Israel",
    "value": "ISR"
  },
  {
    "label": "Italy",
    "value": "ITA"
  },
  {
    "label": "Jamaica",
    "value": "JAM"
  },
  {
    "label": "Japan",
    "value": "JPN"
  },
  {
    "label": "Jersey",
    "value": "JEY"
  },
  {
    "label": "Jordan",
    "value": "JOR"
  },
  {
    "label": "Kazakhstan",
    "value": "KAZ"
  },
  {
    "label": "Kenya",
    "value": "KEN"
  },
  {
    "label": "Kiribati",
    "value": "KIR"
  },
  {
    "label": "Korea, Democratic People's Republic of",
    "value": "PRK"
  },
  {
    "label": "Korea, Republic of",
    "value": "KOR"
  },
  {
    "label": "Kuwait",
    "value": "KWT"
  },
  {
    "label": "Kyrgyzstan",
    "value": "KGZ"
  },
  {
    "label": "Lao People's Democratic Republic",
    "value": "LAO"
  },
  {
    "label": "Latvia",
    "value": "LVA"
  },
  {
    "label": "Lebanon",
    "value": "LBN"
  },
  {
    "label": "Lesotho",
    "value": "LSO"
  },
  {
    "label": "Liberia",
    "value": "LBR"
  },
  {
    "label": "Libyan Arab Jamahiriya",
    "value": "LBY"
  },
  {
    "label": "Liechtenstein",
    "value": "LIE"
  },
  {
    "label": "Lithuania",
    "value": "LTU"
  },
  {
    "label": "Luxembourg",
    "value": "LUX"
  },
  {
    "label": "Macao",
    "value": "MAC"
  },
  {
    "label": "Macedonia, the former Yugoslav Republic of",
    "value": "MKD"
  },
  {
    "label": "Madagascar",
    "value": "MDG"
  },
  {
    "label": "Malawi",
    "value": "MWI"
  },
  {
    "label": "Malaysia",
    "value": "MYS"
  },
  {
    "label": "Maldives",
    "value": "MDV"
  },
  {
    "label": "Mali",
    "value": "MLI"
  },
  {
    "label": "Malta",
    "value": "MLT"
  },
  {
    "label": "Martinique",
    "value": "MTQ"
  },
  {
    "label": "Mauritania",
    "value": "MRT"
  },
  {
    "label": "Mauritius",
    "value": "MUS"
  },
  {
    "label": "Mayotte",
    "value": "MYT"
  },
  {
    "label": "Mexico",
    "value": "MEX"
  },
  {
    "label": "Moldova, Republic of",
    "value": "MDA"
  },
  {
    "label": "Monaco",
    "value": "MCO"
  },
  {
    "label": "Mongolia",
    "value": "MNG"
  },
  {
    "label": "Montenegro",
    "value": "MNE"
  },
  {
    "label": "Montserrat",
    "value": "MSR"
  },
  {
    "label": "Morocco",
    "value": "MAR"
  },
  {
    "label": "Mozambique",
    "value": "MOZ"
  },
  {
    "label": "Myanmar",
    "value": "MMR"
  },
  {
    "label": "Namibia",
    "value": "NAM"
  },
  {
    "label": "Nauru",
    "value": "NRU"
  },
  {
    "label": "Nepal",
    "value": "NPL"
  },
  {
    "label": "Netherlands",
    "value": "NLD"
  },
  {
    "label": "New Caledonia",
    "value": "NCL"
  },
  {
    "label": "New Zealand",
    "value": "NZL"
  },
  {
    "label": "Nicaragua",
    "value": "NIC"
  },
  {
    "label": "Niger",
    "value": "NER"
  },
  {
    "label": "Nigeria",
    "value": "NGA"
  },
  {
    "label": "Niue",
    "value": "NIU"
  },
  {
    "label": "Norfolk Island",
    "value": "NFK"
  },
  {
    "label": "Norway",
    "value": "NOR"
  },
  {
    "label": "Oman",
    "value": "OMN"
  },
  {
    "label": "Pakistan",
    "value": "PAK"
  },
  {
    "label": "Palestinian Territory, Occupied",
    "value": "PSE"
  },
  {
    "label": "Panama",
    "value": "PAN"
  },
  {
    "label": "Papua New Guinea",
    "value": "PNG"
  },
  {
    "label": "Paraguay",
    "value": "PRY"
  },
  {
    "label": "Peru",
    "value": "PER"
  },
  {
    "label": "Philippines",
    "value": "PHL"
  },
  {
    "label": "Pitcairn",
    "value": "PCN"
  },
  {
    "label": "Poland",
    "value": "POL"
  },
  {
    "label": "Portugal",
    "value": "PRT"
  },
  {
    "label": "Qatar",
    "value": "QAT"
  },
  {
    "label": "Reunion",
    "value": "REU"
  },
  {
    "label": "Romania",
    "value": "ROU"
  },
  {
    "label": "Russian Federation",
    "value": "RUS"
  },
  {
    "label": "Rwanda",
    "value": "RWA"
  },
  {
    "label": "Saint Barthélemy",
    "value": "BLM"
  },
  {
    "label": "Saint Helena, Ascension and Tristan da Cunha",
    "value": "SHN"
  },
  {
    "label": "Saint Kitts and Nevis",
    "value": "KNA"
  },
  {
    "label": "Saint Lucia",
    "value": "LCA"
  },
  {
    "label": "Saint Martin (French part)",
    "value": "MAF"
  },
  {
    "label": "Saint Pierre and Miquelon",
    "value": "SPM"
  },
  {
    "label": "Saint Vincent and the Grenadines",
    "value": "VCT"
  },
  {
    "label": "Samoa",
    "value": "WSM"
  },
  {
    "label": "San Marino",
    "value": "SMR"
  },
  {
    "label": "Sao Tome and Principe",
    "value": "STP"
  },
  {
    "label": "Saudi Arabia",
    "value": "SAU"
  },
  {
    "label": "Senegal",
    "value": "SEN"
  },
  {
    "label": "Serbia",
    "value": "SRB"
  },
  {
    "label": "Seychelles",
    "value": "SYC"
  },
  {
    "label": "Sierra Leone",
    "value": "SLE"
  },
  {
    "label": "Singapore",
    "value": "SGP"
  },
  {
    "label": "Sint Maarten (Dutch part)",
    "value": "SXM"
  },
  {
    "label": "Slovakia",
    "value": "SVK"
  },
  {
    "label": "Slovenia",
    "value": "SVN"
  },
  {
    "label": "Solomon Islands",
    "value": "SLB"
  },
  {
    "label": "Somalia",
    "value": "SOM"
  },
  {
    "label": "South Africa",
    "value": "ZAF"
  },
  {
    "label": "South Georgia and the South Sandwich Islands",
    "value": "SGS"
  },
  {
    "label": "South Sudan",
    "value": "SSD"
  },
  {
    "label": "Spain",
    "value": "ESP"
  },
  {
    "label": "Sri Lanka",
    "value": "LKA"
  },
  {
    "label": "Sudan",
    "value": "SDN"
  },
  {
    "label": "Suriname",
    "value": "SUR"
  },
  {
    "label": "Svalbard and Jan Mayen",
    "value": "SJM"
  },
  {
    "label": "Swaziland",
    "value": "SWZ"
  },
  {
    "label": "Sweden",
    "value": "SWE"
  },
  {
    "label": "Switzerland",
    "value": "CHE"
  },
  {
    "label": "Syrian Arab Republic",
    "value": "SYR"
  },
  {
    "label": "Tajikistan",
    "value": "TJK"
  },
  {
    "label": "Tanzania, United Republic of",
    "value": "TZA"
  },
  {
    "label": "Thailand",
    "value": "THA"
  },
  {
    "label": "Timor-Leste",
    "value": "TLS"
  },
  {
    "label": "Togo",
    "value": "TGO"
  },
  {
    "label": "Tokelau",
    "value": "TKL"
  },
  {
    "label": "Tonga",
    "value": "TON"
  },
  {
    "label": "Trinidad and Tobago",
    "value": "TTO"
  },
  {
    "label": "Tunisia",
    "value": "TUN"
  },
  {
    "label": "Turkey",
    "value": "TUR"
  },
  {
    "label": "Turkmenistan",
    "value": "TKM"
  },
  {
    "label": "Turks and Caicos Islands",
    "value": "TCA"
  },
  {
    "label": "Tuvalu",
    "value": "TUV"
  },
  {
    "label": "Uganda",
    "value": "UGA"
  },
  {
    "label": "Ukraine",
    "value": "UKR"
  },
  {
    "label": "United Arab Emirates",
    "value": "ARE"
  },
  {
    "label": "United Kingdom",
    "value": "GBR"
  },
  {
    "label": "United States",
    "value": "USA"
  },
  {
    "label": "Uruguay",
    "value": "URY"
  },
  {
    "label": "Uzbekistan",
    "value": "UZB"
  },
  {
    "label": "Vanuatu",
    "value": "VUT"
  },
  {
    "label": "Venezuela, Bolivarian Republic of",
    "value": "VEN"
  },
  {
    "label": "Viet Nam",
    "value": "VNM"
  },
  {
    "label": "Virgin Islands, British",
    "value": "VGB"
  },
  {
    "label": "Wallis and Futuna",
    "value": "WLF"
  },
  {
    "label": "Western Sahara",
    "value": "ESH"
  },
  {
    "label": "Yemen",
    "value": "YEM"
  },
  {
    "label": "Zambia",
    "value": "ZMB"
  },
  {
    "label": "Zimbabwe",
    "value": "ZWE"
  }
];

const maritalStatuses = [
  'Married',
  'Never Married',
  'Separated',
  'Widowed',
  'Divorced'
];

const branchesServed = [
  { value: 'air force', label: 'Air Force' },
  { value: 'army', label: 'Army' },
  { value: 'coast guard', label: 'Coast Guard' },
  { value: 'marine corps', label: 'Marine Corps' },
  { value: 'merchant seaman', label: 'Merchant Seaman' },
  { value: 'navy', label: 'Navy' },
  { value: 'noaa', label: 'Noaa' },
  { value: 'usphs', label: 'USPHS' },
  { value: 'f.commonwealth', label: 'Filipino Commonwealth Army' },
  { value: 'f.guerilla', label: 'Filipino Guerilla Forces' },
  { value: 'f.scouts new', label: 'Filipino New Scout' },
  { value: 'f.scouts old', label: 'Filipino Old Scout' },
  { value: 'other', label: 'Other' }
];

const dischargeTypes = [
  { value: 'honorable', label: 'Honorable' },
  { value: 'general', label: 'General' },
  { value: 'other', label: 'Other Than Honorable' },
  { value: 'bad-conduct', label: 'Bad Conduct' },
  { value: 'dishonorable', label: 'Dishonorable' },
  { value: 'undesirable', label: 'Undesirable' }
];

const salesforceStates = {
  "BRA": [
    {
      "label": "Acre",
      "value": "AC"
    },
    {
      "label": "Alagoas",
      "value": "AL"
    },
    {
      "label": "Amapá",
      "value": "AP"
    },
    {
      "label": "Amazonas",
      "value": "AM"
    },
    {
      "label": "Bahia",
      "value": "BA"
    },
    {
      "label": "Ceará",
      "value": "CE"
    },
    {
      "label": "Distrito Federal",
      "value": "DF"
    },
    {
      "label": "Espírito Santo",
      "value": "ES"
    },
    {
      "label": "Goiás",
      "value": "GO"
    },
    {
      "label": "Maranhão",
      "value": "MA"
    },
    {
      "label": "Mato Grosso",
      "value": "MT"
    },
    {
      "label": "Mato Grosso do Sul",
      "value": "MS"
    },
    {
      "label": "Minas Gerais",
      "value": "MG"
    },
    {
      "label": "Pará",
      "value": "PA"
    },
    {
      "label": "Paraíba",
      "value": "PB"
    },
    {
      "label": "Paraná",
      "value": "PR"
    },
    {
      "label": "Pernambuco",
      "value": "PE"
    },
    {
      "label": "Piauí",
      "value": "PI"
    },
    {
      "label": "Rio de Janeiro",
      "value": "RJ"
    },
    {
      "label": "Rio Grande do Norte",
      "value": "RN"
    },
    {
      "label": "Rio Grande do Sul",
      "value": "RS"
    },
    {
      "label": "Rondônia",
      "value": "RO"
    },
    {
      "label": "Roraima",
      "value": "RR"
    },
    {
      "label": "Santa Catarina",
      "value": "SC"
    },
    {
      "label": "São Paulo",
      "value": "SP"
    },
    {
      "label": "Sergipe",
      "value": "SE"
    },
    {
      "label": "Tocantins",
      "value": "TO"
    }
  ],
  "ITA": [
    {
      "label": "Agrigento",
      "value": "AG"
    },
    {
      "label": "Alessandria",
      "value": "AL"
    },
    {
      "label": "Ancona",
      "value": "AN"
    },
    {
      "label": "Aosta",
      "value": "AO"
    },
    {
      "label": "Arezzo",
      "value": "AR"
    },
    {
      "label": "Ascoli Piceno",
      "value": "AP"
    },
    {
      "label": "Asti",
      "value": "AT"
    },
    {
      "label": "Avellino",
      "value": "AV"
    },
    {
      "label": "Bari",
      "value": "BA"
    },
    {
      "label": "Barletta-Andria-Trani",
      "value": "BT"
    },
    {
      "label": "Belluno",
      "value": "BL"
    },
    {
      "label": "Benevento",
      "value": "BN"
    },
    {
      "label": "Bergamo",
      "value": "BG"
    },
    {
      "label": "Biella",
      "value": "BI"
    },
    {
      "label": "Bologna",
      "value": "BO"
    },
    {
      "label": "Bolzano",
      "value": "BZ"
    },
    {
      "label": "Brescia",
      "value": "BS"
    },
    {
      "label": "Brindisi",
      "value": "BR"
    },
    {
      "label": "Cagliari",
      "value": "CA"
    },
    {
      "label": "Caltanissetta",
      "value": "CL"
    },
    {
      "label": "Campobasso",
      "value": "CB"
    },
    {
      "label": "Carbonia-Iglesias",
      "value": "CI"
    },
    {
      "label": "Caserta",
      "value": "CE"
    },
    {
      "label": "Catania",
      "value": "CT"
    },
    {
      "label": "Catanzaro",
      "value": "CZ"
    },
    {
      "label": "Chieti",
      "value": "CH"
    },
    {
      "label": "Como",
      "value": "CO"
    },
    {
      "label": "Cosenza",
      "value": "CS"
    },
    {
      "label": "Cremona",
      "value": "CR"
    },
    {
      "label": "Crotone",
      "value": "KR"
    },
    {
      "label": "Cuneo",
      "value": "CN"
    },
    {
      "label": "Enna",
      "value": "EN"
    },
    {
      "label": "Fermo",
      "value": "FM"
    },
    {
      "label": "Ferrara",
      "value": "FE"
    },
    {
      "label": "Florence",
      "value": "FI"
    },
    {
      "label": "Foggia",
      "value": "FG"
    },
    {
      "label": "Forlì-Cesena",
      "value": "FC"
    },
    {
      "label": "Frosinone",
      "value": "FR"
    },
    {
      "label": "Genoa",
      "value": "GE"
    },
    {
      "label": "Gorizia",
      "value": "GO"
    },
    {
      "label": "Grosseto",
      "value": "GR"
    },
    {
      "label": "Imperia",
      "value": "IM"
    },
    {
      "label": "Isernia",
      "value": "IS"
    },
    {
      "label": "L'Aquila",
      "value": "AQ"
    },
    {
      "label": "La Spezia",
      "value": "SP"
    },
    {
      "label": "Latina",
      "value": "LT"
    },
    {
      "label": "Lecce",
      "value": "LE"
    },
    {
      "label": "Lecco",
      "value": "LC"
    },
    {
      "label": "Livorno",
      "value": "LI"
    },
    {
      "label": "Lodi",
      "value": "LO"
    },
    {
      "label": "Lucca",
      "value": "LU"
    },
    {
      "label": "Macerata",
      "value": "MC"
    },
    {
      "label": "Mantua",
      "value": "MN"
    },
    {
      "label": "Massa and Carrara",
      "value": "MS"
    },
    {
      "label": "Matera",
      "value": "MT"
    },
    {
      "label": "Medio Campidano",
      "value": "VS"
    },
    {
      "label": "Messina",
      "value": "ME"
    },
    {
      "label": "Milan",
      "value": "MI"
    },
    {
      "label": "Modena",
      "value": "MO"
    },
    {
      "label": "Monza and Brianza",
      "value": "MB"
    },
    {
      "label": "Naples",
      "value": "NA"
    },
    {
      "label": "Novara",
      "value": "NO"
    },
    {
      "label": "Nuoro",
      "value": "NU"
    },
    {
      "label": "Ogliastra",
      "value": "OG"
    },
    {
      "label": "Olbia-Tempio",
      "value": "OT"
    },
    {
      "label": "Oristano",
      "value": "OR"
    },
    {
      "label": "Padua",
      "value": "PD"
    },
    {
      "label": "Palermo",
      "value": "PA"
    },
    {
      "label": "Parma",
      "value": "PR"
    },
    {
      "label": "Pavia",
      "value": "PV"
    },
    {
      "label": "Perugia",
      "value": "PG"
    },
    {
      "label": "Pesaro and Urbino",
      "value": "PU"
    },
    {
      "label": "Pescara",
      "value": "PE"
    },
    {
      "label": "Piacenza",
      "value": "PC"
    },
    {
      "label": "Pisa",
      "value": "PI"
    },
    {
      "label": "Pistoia",
      "value": "PT"
    },
    {
      "label": "Pordenone",
      "value": "PN"
    },
    {
      "label": "Potenza",
      "value": "PZ"
    },
    {
      "label": "Prato",
      "value": "PO"
    },
    {
      "label": "Ragusa",
      "value": "RG"
    },
    {
      "label": "Ravenna",
      "value": "RA"
    },
    {
      "label": "Reggio Calabria",
      "value": "RC"
    },
    {
      "label": "Reggio Emilia",
      "value": "RE"
    },
    {
      "label": "Rieti",
      "value": "RI"
    },
    {
      "label": "Rimini",
      "value": "RN"
    },
    {
      "label": "Rome",
      "value": "RM"
    },
    {
      "label": "Rovigo",
      "value": "RO"
    },
    {
      "label": "Salerno",
      "value": "SA"
    },
    {
      "label": "Sassari",
      "value": "SS"
    },
    {
      "label": "Savona",
      "value": "SV"
    },
    {
      "label": "Siena",
      "value": "SI"
    },
    {
      "label": "Sondrio",
      "value": "SO"
    },
    {
      "label": "Syracuse",
      "value": "SR"
    },
    {
      "label": "Taranto",
      "value": "TA"
    },
    {
      "label": "Teramo",
      "value": "TE"
    },
    {
      "label": "Terni",
      "value": "TR"
    },
    {
      "label": "Trapani",
      "value": "TP"
    },
    {
      "label": "Trento",
      "value": "TN"
    },
    {
      "label": "Treviso",
      "value": "TV"
    },
    {
      "label": "Trieste",
      "value": "TS"
    },
    {
      "label": "Turin",
      "value": "TO"
    },
    {
      "label": "Udine",
      "value": "UD"
    },
    {
      "label": "Varese",
      "value": "VA"
    },
    {
      "label": "Venice",
      "value": "VE"
    },
    {
      "label": "Verbano-Cusio-Ossola",
      "value": "VB"
    },
    {
      "label": "Vercelli",
      "value": "VC"
    },
    {
      "label": "Verona",
      "value": "VR"
    },
    {
      "label": "Vibo Valentia",
      "value": "VV"
    },
    {
      "label": "Vicenza",
      "value": "VI"
    },
    {
      "label": "Viterbo",
      "value": "VT"
    }
  ],
  "MEX": [
    {
      "label": "Aguascalientes",
      "value": "AG"
    },
    {
      "label": "Baja California",
      "value": "BC"
    },
    {
      "label": "Baja California Sur",
      "value": "BS"
    },
    {
      "label": "Campeche",
      "value": "CM"
    },
    {
      "label": "Chiapas",
      "value": "CS"
    },
    {
      "label": "Chihuahua",
      "value": "CH"
    },
    {
      "label": "Coahuila",
      "value": "CO"
    },
    {
      "label": "Colima",
      "value": "CL"
    },
    {
      "label": "Durango",
      "value": "DG"
    },
    {
      "label": "Federal District",
      "value": "DF"
    },
    {
      "label": "Guanajuato",
      "value": "GT"
    },
    {
      "label": "Guerrero",
      "value": "GR"
    },
    {
      "label": "Hidalgo",
      "value": "HG"
    },
    {
      "label": "Jalisco",
      "value": "JA"
    },
    {
      "label": "Mexico State",
      "value": "ME"
    },
    {
      "label": "Michoacán",
      "value": "MI"
    },
    {
      "label": "Morelos",
      "value": "MO"
    },
    {
      "label": "Nayarit",
      "value": "NA"
    },
    {
      "label": "Nuevo León",
      "value": "NL"
    },
    {
      "label": "Oaxaca",
      "value": "OA"
    },
    {
      "label": "Puebla",
      "value": "PB"
    },
    {
      "label": "Querétaro",
      "value": "QE"
    },
    {
      "label": "Quintana Roo",
      "value": "QR"
    },
    {
      "label": "San Luis Potosí",
      "value": "SL"
    },
    {
      "label": "Sinaloa",
      "value": "SI"
    },
    {
      "label": "Sonora",
      "value": "SO"
    },
    {
      "label": "Tabasco",
      "value": "TB"
    },
    {
      "label": "Tamaulipas",
      "value": "TM"
    },
    {
      "label": "Tlaxcala",
      "value": "TL"
    },
    {
      "label": "Veracruz",
      "value": "VE"
    },
    {
      "label": "Yucatán",
      "value": "YU"
    },
    {
      "label": "Zacatecas",
      "value": "ZA"
    }
  ],
  "USA": [
    {
      "value": "AA",
      "label": "Armed Forces Americas"
    },
    {
      "value": "AE",
      "label": "Armed Forces Europe"
    },
    {
      "value": "AK",
      "label": "Alaska"
    },
    {
      "value": "AL",
      "label": "Alabama"
    },
    {
      "value": "AP",
      "label": "Armed Forces Pacific"
    },
    {
      "value": "AR",
      "label": "Arkansas"
    },
    {
      "value": "AS",
      "label": "American Samoa"
    },
    {
      "value": "AZ",
      "label": "Arizona"
    },
    {
      "value": "CA",
      "label": "California"
    },
    {
      "value": "CO",
      "label": "Colorado"
    },
    {
      "value": "CT",
      "label": "Connecticut"
    },
    {
      "value": "DC",
      "label": "District of Columbia"
    },
    {
      "value": "DE",
      "label": "Delaware"
    },
    {
      "value": "FL",
      "label": "Florida"
    },
    {
      "value": "FM",
      "label": "Federated Micronesia"
    },
    {
      "value": "GA",
      "label": "Georgia"
    },
    {
      "value": "GU",
      "label": "Guam"
    },
    {
      "value": "HI",
      "label": "Hawaii"
    },
    {
      "value": "IA",
      "label": "Iowa"
    },
    {
      "value": "ID",
      "label": "Idaho"
    },
    {
      "value": "IL",
      "label": "Illinois"
    },
    {
      "value": "IN",
      "label": "Indiana"
    },
    {
      "value": "KS",
      "label": "Kansas"
    },
    {
      "value": "KY",
      "label": "Kentucky"
    },
    {
      "value": "LA",
      "label": "Louisiana"
    },
    {
      "value": "MA",
      "label": "Massachusetts"
    },
    {
      "value": "MD",
      "label": "Maryland"
    },
    {
      "value": "ME",
      "label": "Maine"
    },
    {
      "value": "MH",
      "label": "Marshall Islands"
    },
    {
      "value": "MI",
      "label": "Michigan"
    },
    {
      "value": "MN",
      "label": "Minnesota"
    },
    {
      "value": "MO",
      "label": "Missouri"
    },
    {
      "value": "MP",
      "label": "Northern Mariana Islands"
    },
    {
      "value": "MS",
      "label": "Mississippi"
    },
    {
      "value": "MT",
      "label": "Montana"
    },
    {
      "value": "NC",
      "label": "North Carolina"
    },
    {
      "value": "ND",
      "label": "North Dakota"
    },
    {
      "value": "NE",
      "label": "Nebraska"
    },
    {
      "value": "NH",
      "label": "New Hampshire"
    },
    {
      "value": "NJ",
      "label": "New Jersey"
    },
    {
      "value": "NM",
      "label": "New Mexico"
    },
    {
      "value": "NV",
      "label": "Nevada"
    },
    {
      "value": "NY",
      "label": "New York"
    },
    {
      "value": "OH",
      "label": "Ohio"
    },
    {
      "value": "OK",
      "label": "Oklahoma"
    },
    {
      "value": "OR",
      "label": "Oregon"
    },
    {
      "value": "PA",
      "label": "Pennsylvania"
    },
    {
      "value": "PR",
      "label": "Puerto Rico"
    },
    {
      "value": "PW",
      "label": "Palau"
    },
    {
      "value": "RI",
      "label": "Rhode Island"
    },
    {
      "value": "SC",
      "label": "South Carolina"
    },
    {
      "value": "SD",
      "label": "South Dakota"
    },
    {
      "value": "TN",
      "label": "Tennessee"
    },
    {
      "value": "TX",
      "label": "Texas"
    },
    {
      "value": "UM",
      "label": "United States Minor Outlying Islands"
    },
    {
      "value": "UT",
      "label": "Utah"
    },
    {
      "value": "VA",
      "label": "Virginia"
    },
    {
      "value": "VI",
      "label": "US Virgin Islands"
    },
    {
      "value": "VT",
      "label": "Vermont"
    },
    {
      "value": "WA",
      "label": "Washington"
    },
    {
      "value": "WI",
      "label": "Wisconsin"
    },
    {
      "value": "WV",
      "label": "West Virginia"
    },
    {
      "value": "WY",
      "label": "Wyoming"
    }
  ],
  "CAN": [
    {
      "label": "Alberta",
      "value": "AB"
    },
    {
      "label": "British Columbia",
      "value": "BC"
    },
    {
      "label": "Manitoba",
      "value": "MB"
    },
    {
      "label": "New Brunswick",
      "value": "NB"
    },
    {
      "label": "Newfoundland and Labrador",
      "value": "NL"
    },
    {
      "label": "Northwest Territories",
      "value": "NT"
    },
    {
      "label": "Nova Scotia",
      "value": "NS"
    },
    {
      "label": "Nunavut",
      "value": "NU"
    },
    {
      "label": "Ontario",
      "value": "ON"
    },
    {
      "label": "Prince Edward Island",
      "value": "PE"
    },
    {
      "label": "Quebec",
      "value": "QC"
    },
    {
      "label": "Saskatchewan",
      "value": "SK"
    },
    {
      "label": "Yukon Territories",
      "value": "YT"
    }
  ],
  "IND": [
    {
      "label": "Andaman and Nicobar Islands",
      "value": "AN"
    },
    {
      "label": "Andhra Pradesh",
      "value": "AP"
    },
    {
      "label": "Arunachal Pradesh",
      "value": "AR"
    },
    {
      "label": "Assam",
      "value": "AS"
    },
    {
      "label": "Bihar",
      "value": "BR"
    },
    {
      "label": "Chandigarh",
      "value": "CH"
    },
    {
      "label": "Chhattisgarh",
      "value": "CT"
    },
    {
      "label": "Dadra and Nagar Haveli",
      "value": "DN"
    },
    {
      "label": "Daman and Diu",
      "value": "DD"
    },
    {
      "label": "Delhi",
      "value": "DL"
    },
    {
      "label": "Goa",
      "value": "GA"
    },
    {
      "label": "Gujarat",
      "value": "GJ"
    },
    {
      "label": "Haryana",
      "value": "HR"
    },
    {
      "label": "Himachal Pradesh",
      "value": "HP"
    },
    {
      "label": "Jammu and Kashmir",
      "value": "JK"
    },
    {
      "label": "Jharkhand",
      "value": "JH"
    },
    {
      "label": "Karnataka",
      "value": "KA"
    },
    {
      "label": "Kerala",
      "value": "KL"
    },
    {
      "label": "Lakshadweep",
      "value": "LD"
    },
    {
      "label": "Madhya Pradesh",
      "value": "MP"
    },
    {
      "label": "Maharashtra",
      "value": "MH"
    },
    {
      "label": "Manipur",
      "value": "MN"
    },
    {
      "label": "Meghalaya",
      "value": "ML"
    },
    {
      "label": "Mizoram",
      "value": "MZ"
    },
    {
      "label": "Nagaland",
      "value": "NL"
    },
    {
      "label": "Odisha",
      "value": "OR"
    },
    {
      "label": "Puducherry",
      "value": "PY"
    },
    {
      "label": "Punjab",
      "value": "PB"
    },
    {
      "label": "Rajasthan",
      "value": "RJ"
    },
    {
      "label": "Sikkim",
      "value": "SK"
    },
    {
      "label": "Tamil Nadu",
      "value": "TN"
    },
    {
      "label": "Tripura",
      "value": "TR"
    },
    {
      "label": "Uttarakhand",
      "value": "UT"
    },
    {
      "label": "Uttar Pradesh",
      "value": "UP"
    },
    {
      "label": "West Bengal",
      "value": "WB"
    }
  ],
  "CHN": [
    {
      "label": "Anhui",
      "value": "34"
    },
    {
      "label": "Beijing",
      "value": "11"
    },
    {
      "label": "Chinese Taipei",
      "value": "71"
    },
    {
      "label": "Chongqing",
      "value": "50"
    },
    {
      "label": "Fujian",
      "value": "35"
    },
    {
      "label": "Gansu",
      "value": "62"
    },
    {
      "label": "Guangdong",
      "value": "44"
    },
    {
      "label": "Guangxi",
      "value": "45"
    },
    {
      "label": "Guizhou",
      "value": "52"
    },
    {
      "label": "Hainan",
      "value": "46"
    },
    {
      "label": "Hebei",
      "value": "13"
    },
    {
      "label": "Heilongjiang",
      "value": "23"
    },
    {
      "label": "Henan",
      "value": "41"
    },
    {
      "label": "Hong Kong",
      "value": "91"
    },
    {
      "label": "Hubei",
      "value": "42"
    },
    {
      "label": "Hunan",
      "value": "43"
    },
    {
      "label": "Jiangsu",
      "value": "32"
    },
    {
      "label": "Jiangxi",
      "value": "36"
    },
    {
      "label": "Jilin",
      "value": "22"
    },
    {
      "label": "Liaoning",
      "value": "21"
    },
    {
      "label": "Macao",
      "value": "92"
    },
    {
      "label": "Nei Mongol",
      "value": "15"
    },
    {
      "label": "Ningxia",
      "value": "64"
    },
    {
      "label": "Qinghai",
      "value": "63"
    },
    {
      "label": "Shaanxi",
      "value": "61"
    },
    {
      "label": "Shandong",
      "value": "37"
    },
    {
      "label": "Shanghai",
      "value": "31"
    },
    {
      "label": "Shanxi",
      "value": "14"
    },
    {
      "label": "Sichuan",
      "value": "51"
    },
    {
      "label": "Tianjin",
      "value": "12"
    },
    {
      "label": "Xinjiang",
      "value": "65"
    },
    {
      "label": "Xizang",
      "value": "54"
    },
    {
      "label": "Yunnan",
      "value": "53"
    },
    {
      "label": "Zhejiang",
      "value": "33"
    }
  ],
  "AUS": [
    {
      "label": "Australian Capital Territory",
      "value": "ACT"
    },
    {
      "label": "New South Wales",
      "value": "NSW"
    },
    {
      "label": "Northern Territory",
      "value": "NT"
    },
    {
      "label": "Queensland",
      "value": "QLD"
    },
    {
      "label": "South Australia",
      "value": "SA"
    },
    {
      "label": "Tasmania",
      "value": "TAS"
    },
    {
      "label": "Victoria",
      "value": "VIC"
    },
    {
      "label": "Western Australia",
      "value": "WA"
    }
  ],
  "IRL": [
    {
      "label": "Carlow",
      "value": "CW"
    },
    {
      "label": "Cavan",
      "value": "CN"
    },
    {
      "label": "Clare",
      "value": "CE"
    },
    {
      "label": "Cork",
      "value": "CO"
    },
    {
      "label": "Donegal",
      "value": "DL"
    },
    {
      "label": "Dublin",
      "value": "D"
    },
    {
      "label": "Galway",
      "value": "G"
    },
    {
      "label": "Kerry",
      "value": "KY"
    },
    {
      "label": "Kildare",
      "value": "KE"
    },
    {
      "label": "Kilkenny",
      "value": "KK"
    },
    {
      "label": "Laois",
      "value": "LS"
    },
    {
      "label": "Leitrim",
      "value": "LM"
    },
    {
      "label": "Limerick",
      "value": "LK"
    },
    {
      "label": "Longford",
      "value": "LD"
    },
    {
      "label": "Louth",
      "value": "LH"
    },
    {
      "label": "Mayo",
      "value": "MO"
    },
    {
      "label": "Meath",
      "value": "MH"
    },
    {
      "label": "Monaghan",
      "value": "MN"
    },
    {
      "label": "Offaly",
      "value": "OY"
    },
    {
      "label": "Roscommon",
      "value": "RN"
    },
    {
      "label": "Sligo",
      "value": "SO"
    },
    {
      "label": "Tipperary",
      "value": "TA"
    },
    {
      "label": "Waterford",
      "value": "WD"
    },
    {
      "label": "Westmeath",
      "value": "WH"
    },
    {
      "label": "Wexford",
      "value": "WX"
    },
    {
      "label": "Wicklow",
      "value": "WW"
    }
  ]
};

const states50AndDC = [
  { label: 'Alabama', value: 'AL' },
  { label: 'Alaska', value: 'AK' },
  { label: 'Arizona', value: 'AZ' },
  { label: 'Arkansas', value: 'AR' },
  { label: 'California', value: 'CA' },
  { label: 'Colorado', value: 'CO' },
  { label: 'Connecticut', value: 'CT' },
  { label: 'Delaware', value: 'DE' },
  { label: 'District Of Columbia', value: 'DC' },
  { label: 'Florida', value: 'FL' },
  { label: 'Georgia', value: 'GA' },
  { label: 'Hawaii', value: 'HI' },
  { label: 'Idaho', value: 'ID' },
  { label: 'Illinois', value: 'IL' },
  { label: 'Indiana', value: 'IN' },
  { label: 'Iowa', value: 'IA' },
  { label: 'Kansas', value: 'KS' },
  { label: 'Kentucky', value: 'KY' },
  { label: 'Louisiana', value: 'LA' },
  { label: 'Maine', value: 'ME' },
  { label: 'Maryland', value: 'MD' },
  { label: 'Massachusetts', value: 'MA' },
  { label: 'Michigan', value: 'MI' },
  { label: 'Minnesota', value: 'MN' },
  { label: 'Mississippi', value: 'MS' },
  { label: 'Missouri', value: 'MO' },
  { label: 'Montana', value: 'MT' },
  { label: 'Nebraska', value: 'NE' },
  { label: 'Nevada', value: 'NV' },
  { label: 'New Hampshire', value: 'NH' },
  { label: 'New Jersey', value: 'NJ' },
  { label: 'New Mexico', value: 'NM' },
  { label: 'New York', value: 'NY' },
  { label: 'North Carolina', value: 'NC' },
  { label: 'North Dakota', value: 'ND' },
  { label: 'Ohio', value: 'OH' },
  { label: 'Oklahoma', value: 'OK' },
  { label: 'Oregon', value: 'OR' },
  { label: 'Pennsylvania', value: 'PA' },
  { label: 'Rhode Island', value: 'RI' },
  { label: 'South Carolina', value: 'SC' },
  { label: 'South Dakota', value: 'SD' },
  { label: 'Tennessee', value: 'TN' },
  { label: 'Texas', value: 'TX' },
  { label: 'Utah', value: 'UT' },
  { label: 'Vermont', value: 'VT' },
  { label: 'Virginia', value: 'VA' },
  { label: 'Washington', value: 'WA' },
  { label: 'West Virginia', value: 'WV' },
  { label: 'Wisconsin', value: 'WI' },
  { label: 'Wyoming', value: 'WY' }
]

const states = {
  CAN: [
    { label: 'Alberta', value: 'AB' },
    { label: 'British Columbia', value: 'BC' },
    { label: 'Manitoba', value: 'MB' },
    { label: 'New Brunswick', value: 'NB' },
    { label: 'Newfoundland', value: 'NF' },
    { label: 'Northwest Territories', value: 'NT' },
    { label: 'Nova Scotia', value: 'NV' },
    { label: 'Nunavut Province', value: 'NU' },
    { label: 'Ontario', value: 'ON' },
    { label: 'Prince Edward Island', value: 'PE' },
    { label: 'Quebec', value: 'QC' },
    { label: 'Saskatchewan', value: 'SK' },
    { label: 'Yukon Territory', value: 'YT' }
  ],
  MEX: [
    { label: 'Aguascalientes', value: 'aguascalientes' },
    { label: 'Baja California Norte', value: 'baja-california-norte' },
    { label: 'Baja California Sur', value: 'baja-california-sur' },
    { label: 'Campeche', value: 'campeche' },
    { label: 'Chiapas', value: 'chiapas' },
    { label: 'Chihuahua', value: 'chihuahua' },
    { label: 'Coahuila', value: 'coahuila' },
    { label: 'Colima', value: 'colima' },
    { label: 'Distrito Federal', value: 'distrito-federal' },
    { label: 'Durango', value: 'durango' },
    { label: 'Guanajuato', value: 'guanajuato' },
    { label: 'Guerrero', value: 'guerrero' },
    { label: 'Hidalgo', value: 'hidalgo' },
    { label: 'Jalisco', value: 'jalisco' },
    { label: 'México', value: 'mexico' },
    { label: 'Michoacán', value: 'michoacan' },
    { label: 'Morelos', value: 'morelos' },
    { label: 'Nayarit', value: 'nayarit' },
    { label: 'Nuevo León', value: 'nuevo-leon' },
    { label: 'Oaxaca', value: 'oaxaca' },
    { label: 'Puebla', value: 'puebla' },
    { label: 'Querétaro', value: 'queretaro' },
    { label: 'Quintana Roo', value: 'quintana-roo' },
    { label: 'San Luis Potosí', value: 'san-luis-potosi' },
    { label: 'Sinaloa', value: 'sinaloa' },
    { label: 'Sonora', value: 'sonora' },
    { label: 'Tabasco', value: 'tabasco' },
    { label: 'Tamaulipas', value: 'tamaulipas' },
    { label: 'Tlaxcala', value: 'tlaxcala' },
    { label: 'Veracruz', value: 'veracruz' },
    { label: 'Yucatán', value: 'yucatan' },
    { label: 'Zacatecas', value: 'zacatecas' }
  ],
  USA: states50AndDC.concat([
    { label: 'American Samoa', value: 'AS' },
    { label: 'Armed Forces Americas (AA)', value: 'AA' },
    { label: 'Armed Forces Europe (AE)', value: 'AE' },
    { label: 'Armed Forces Pacific (AP)', value: 'AP' },
    { label: 'Federated States Of Micronesia', value: 'FM' },
    { label: 'Guam', value: 'GU' },
    { label: 'Marshall Islands', value: 'MH' },
    { label: 'Northern Mariana Islands', value: 'MP' },
    { label: 'Palau', value: 'PW' },
    { label: 'Puerto Rico', value: 'PR' },
    { label: 'Virgin Islands', value: 'VI' }
  ]).sort((stateA, stateB) => (stateA.label.localeCompare(stateB.label)))
};

const suffixes = [
  'Jr.',
  'Sr.',
  'II',
  'III',
  'IV'
];

const genders = [
  { label: 'Female', value: 'F' },
  { label: 'Male', value: 'M' }
];

const months = [
  { label: 'Jan', value: 1 },
  { label: 'Feb', value: 2 },
  { label: 'Mar', value: 3 },
  { label: 'Apr', value: 4 },
  { label: 'May', value: 5 },
  { label: 'Jun', value: 6 },
  { label: 'Jul', value: 7 },
  { label: 'Aug', value: 8 },
  { label: 'Sep', value: 9 },
  { label: 'Oct', value: 10 },
  { label: 'Nov', value: 11 },
  { label: 'Dec', value: 12 }
];

const twentyNineDays = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29'];
const thirtyDays = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
const thirtyOneDays = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];

const days = {
  1: thirtyOneDays,
  2: twentyNineDays,
  3: thirtyOneDays,
  4: thirtyDays,
  5: thirtyOneDays,
  6: thirtyDays,
  7: thirtyOneDays,
  8: thirtyOneDays,
  9: thirtyDays,
  10: thirtyOneDays,
  11: thirtyDays,
  12: thirtyOneDays
};

const vaMedicalFacilities = {
  "VT": [
    {
      "value": "405HK",
      "label": "WHITE RIVER JUNCTION MORC"
    },
    {
      "value": "405GA",
      "label": "BENNINGTON VERMONT OUTREACH CLINIC"
    },
    {
      "value": "405HA",
      "label": "BURLINGTON LAKESIDE CBOC"
    },
    {
      "value": "405HB",
      "label": "MONTPELIER OUTREACH CLINIC"
    },
    {
      "value": "405HF",
      "label": "RUTLAND VERMONT OUTREACH CLINIC"
    },
    {
      "value": "405GC",
      "label": "BRATTLEBORO CBOC"
    },
    {
      "value": "405",
      "label": "WHITE RIVER JCT VAMROC"
    }
  ],
  "MT": [
    {
      "value": "436GA",
      "label": "ANACONDA CBOC"
    },
    {
      "value": "436GB",
      "label": "GREAT FALLS CBOC"
    },
    {
      "value": "436GC",
      "label": "MISSOULA CBOC"
    },
    {
      "value": "436GD",
      "label": "BOZEMAN VA CLINIC"
    },
    {
      "value": "436GF",
      "label": "KALISPELL VA CLINIC"
    },
    {
      "value": "436GH",
      "label": "BILLINGS VA CLINIC"
    },
    {
      "value": "436GI",
      "label": "GLASGOW VA CLINIC"
    },
    {
      "value": "436GJ",
      "label": "MILES CITY VA CLINIC"
    },
    {
      "value": "436GK",
      "label": "GLENDIVE VA CLINIC"
    },
    {
      "value": "436A4",
      "label": "MILES CITY VA MEDICAL CENTER"
    },
    {
      "value": "436GL",
      "label": "CUT BANK VA CLINIC"
    },
    {
      "value": "436GM",
      "label": "LEWISTON CBOC"
    },
    {
      "value": "436HC",
      "label": "MERRIL LUNDMAN VA OPC"
    },
    {
      "value": "436QB",
      "label": "PLENTYWOOD VA CLINIC"
    },
    {
      "value": "436QC",
      "label": "HELENA VA CLINIC"
    },
    {
      "value": "436QA",
      "label": "HAMILTON VA CLINIC"
    },
    {
      "value": "436",
      "label": "FORT HARRISON MEDICAL CENTER"
    }
  ],
  "ND": [
    {
      "value": "437GA",
      "label": "GRAFTON VA CLINIC"
    },
    {
      "value": "437GB",
      "label": "BISMARCK"
    },
    {
      "value": "437GD",
      "label": "MINOT CBOC"
    },
    {
      "value": "437GI",
      "label": "GRAND FORKS CBOC"
    },
    {
      "value": "437GF",
      "label": "WILLISTON CBOC"
    },
    {
      "value": "437GJ",
      "label": "DICKINSON VA CLINIC"
    },
    {
      "value": "437GK",
      "label": "JAMESTOWN VA CLINIC"
    },
    {
      "value": "437GL",
      "label": "DEVILS LAKE VA CBOC"
    },
    {
      "value": "437",
      "label": "FARGO VA HCS"
    }
  ],
  "MN": [
    {
      "value": "437GC",
      "label": "FERGUS FALLS"
    },
    {
      "value": "618GA",
      "label": "SOUTH CENTRAL CBOC"
    },
    {
      "value": "618GB",
      "label": "HIBBING (CBOC)"
    },
    {
      "value": "618GD",
      "label": "ST. PAUL (CBOC)"
    },
    {
      "value": "618GG",
      "label": "ROCHESTER (CBOC)"
    },
    {
      "value": "656GA",
      "label": "BRAINERD VA COMMUNITY OUTPATIENT CLINIC"
    },
    {
      "value": "656GB",
      "label": "MONTEVIDEO CBOC"
    },
    {
      "value": "437GE",
      "label": "BEMIDJI CBOC"
    },
    {
      "value": "656GC",
      "label": "MAX J. BEILKE CBOC"
    },
    {
      "value": "618GI",
      "label": "NORTHWEST METRO VA OPC"
    },
    {
      "value": "618GK",
      "label": "ALBERT LEA CBOC"
    },
    {
      "value": "618GL",
      "label": "MINNEAPOLIS VA CBOC"
    },
    {
      "value": "618GJ",
      "label": "SHAKOPEE CBOC"
    },
    {
      "value": "618GN",
      "label": "LYLE C PEARSON CBOC"
    },
    {
      "value": "618QB",
      "label": "ELY VA CLINIC"
    },
    {
      "value": "618",
      "label": "MINNEAPOLIS VA HCS"
    },
    {
      "value": "656",
      "label": "ST. CLOUD VA HEALTH CARE SYSTEM"
    }
  ],
  "IA": [
    {
      "value": "438GA",
      "label": "SPIRIT LAKE CBOC"
    },
    {
      "value": "438GC",
      "label": "SIOUX CITY CBOC"
    },
    {
      "value": "636A8",
      "label": "IOWA CITY HCS"
    },
    {
      "value": "636A6",
      "label": "VA CIHS, DES MOINES DIVISION"
    },
    {
      "value": "636GP",
      "label": "SHENANDOAH CBOC"
    },
    {
      "value": "636GX",
      "label": "FORT DODGE NORTH VA CLINIC"
    }
  ],
  "SD": [
    {
      "value": "438GD",
      "label": "ABERDEEN CBOC"
    },
    {
      "value": "568A4",
      "label": "HOT SPRINGS, SD MC"
    },
    {
      "value": "568GA",
      "label": "RAPID CITY CBOC"
    },
    {
      "value": "568GB",
      "label": "PIERRE CBOC"
    },
    {
      "value": "568HF",
      "label": "PINE RIDGE"
    },
    {
      "value": "568HG",
      "label": "SIOUX SAN"
    },
    {
      "value": "568HJ",
      "label": "MISSION CBOC"
    },
    {
      "value": "568HK",
      "label": "MCLAUGHLIN VA CLINIC"
    },
    {
      "value": "568HM",
      "label": "EAGLE BUTTE"
    },
    {
      "value": "568HP",
      "label": "WINNER"
    },
    {
      "value": "438GE",
      "label": "WAGNER CBOC"
    },
    {
      "value": "438GF",
      "label": "WATERTOWN CBOC"
    },
    {
      "value": "568",
      "label": "BLACK HILLS HEALTH CARE SYSTEM - FT. MEADE DIVISION"
    },
    {
      "value": "438",
      "label": "SIOUX FALLS VA HCS"
    }
  ],
  "NE": [
    {
      "value": "442GB",
      "label": "SIDNEY VA CLINC"
    },
    {
      "value": "636GA",
      "label": "NORFOLK CBOC"
    },
    {
      "value": "636GB",
      "label": "NORTH PLATTE CBOC"
    },
    {
      "value": "568HB",
      "label": "GORDON CBOC"
    },
    {
      "value": "568HH",
      "label": "SCOTTSBLUFF CBOC"
    },
    {
      "value": "636A4",
      "label": "VA NWIHS, GRAND ISLAND DIV"
    },
    {
      "value": "636A5",
      "label": "VA CENTRAL PLAINS HEALTH NETWORK - LINCOLN DIVISION"
    },
    {
      "value": "636GQ",
      "label": "HOLDREGE, NE CBOC"
    },
    {
      "value": "636GL",
      "label": "BELLEVUE VA CBOC"
    },
    {
      "value": "636GV",
      "label": "O'NEILL VA CBOC"
    },
    {
      "value": "636",
      "label": "VA CENTRAL PLAINS HEALTH NETWORK - OMAHA DIVISION"
    }
  ],
  "CO": [
    {
      "value": "442GC",
      "label": "FORT COLLINS VA CLINIC"
    },
    {
      "value": "442GD",
      "label": "LOVELAND VA CLINIC"
    },
    {
      "value": "501GJ",
      "label": "DURANGO VA CLINIC"
    },
    {
      "value": "554GB",
      "label": "AURORA VA CLINIC"
    },
    {
      "value": "554GC",
      "label": "GOLDEN VA CLINIC"
    },
    {
      "value": "554GD",
      "label": "PFC JAMES DUNN VA CLINIC"
    },
    {
      "value": "554GE",
      "label": "FLOYD K. LINDSTROM VA CLINIC"
    },
    {
      "value": "554GF",
      "label": "ALAMOSA VA CLINIC"
    },
    {
      "value": "554GG",
      "label": "LA JUNTA COMMUNITY BASED OUTPATIENT CLINIC (554GG)"
    },
    {
      "value": "554GH",
      "label": "LAMAR VA CLINIC"
    },
    {
      "value": "575GA",
      "label": "MONTROSE CBOC"
    },
    {
      "value": "554GI",
      "label": "BURLINGTON VA CLINIC"
    },
    {
      "value": "575GB",
      "label": "CRAIG TELEHEALTH OUTRCH CLINIC"
    },
    {
      "value": "554QA",
      "label": "DENVER VA CLINIC"
    },
    {
      "value": "575QC",
      "label": "GRAND JUNCTION VA MOBILE CLIN"
    },
    {
      "value": "554",
      "label": "ROCKY MOUNTAIN REGIONAL VAMC"
    },
    {
      "value": "575",
      "label": "GRAND JUNCTION VAMC"
    }
  ],
  "HI": [
    {
      "value": "459GA",
      "label": "MAUI VA CLINIC"
    },
    {
      "value": "459GB",
      "label": "HILO CBOC"
    },
    {
      "value": "459GC",
      "label": "KONA CBOC"
    },
    {
      "value": "459GD",
      "label": "KAUAI CBOC"
    },
    {
      "value": "459GG",
      "label": "LEEWARD OAHU CBOC"
    },
    {
      "value": "459",
      "label": "SPARK M. MATSUNAGA VAMC"
    }
  ],
  "GU": [
    {
      "value": "459GE",
      "label": "GUAM CBOC"
    }
  ],
  "ME": [
    {
      "value": "402GA",
      "label": "CARIBOU MAINE CBOC"
    },
    {
      "value": "402GB",
      "label": "CALAIS MAINE CBOC"
    },
    {
      "value": "402GC",
      "label": "RUMFORD MAINE CBOC"
    },
    {
      "value": "402GD",
      "label": "SACO MAINE CBOC"
    },
    {
      "value": "402HB",
      "label": "BANGOR MAINE CBOC"
    },
    {
      "value": "402HC",
      "label": "PORTLAND MAINE MH ORC"
    },
    {
      "value": "402HL",
      "label": "RURAL AND COMNTY HLTCARE MOC"
    },
    {
      "value": "402GE",
      "label": "LEWISTON AUBURN CBOC"
    },
    {
      "value": "402GF",
      "label": "LINCOLN VA CLINIC"
    },
    {
      "value": "402",
      "label": "MAINE VA HCS"
    }
  ],
  "NH": [
    {
      "value": "405HC",
      "label": "ST. JOHNSBURY VERMONT OUTREACH CLINIC"
    },
    {
      "value": "405HE",
      "label": "KEENE OUT REACH CENTER"
    },
    {
      "value": "608GA",
      "label": "PORTSMOUTH CBOC"
    },
    {
      "value": "608GC",
      "label": "SOMERSWORTH CBOC"
    },
    {
      "value": "608GD",
      "label": "CONWAY CBOC"
    },
    {
      "value": "608HA",
      "label": "TILTON CBOC"
    },
    {
      "value": "608",
      "label": "MANCHESTER VAMC"
    }
  ],
  "AK": [
    {
      "value": "463GA",
      "label": "FAIRBANKS VA CLINIC"
    },
    {
      "value": "463GB",
      "label": "KENAI VA CLINIC"
    },
    {
      "value": "463GC",
      "label": "MAT-SU VA CLINIC"
    },
    {
      "value": "463GD",
      "label": "HOMER VA CLINIC"
    },
    {
      "value": "463GE",
      "label": "JUNEAU VA CLINIC"
    },
    {
      "value": "463",
      "label": "ANCHORAGE VA MEDICAL CENTER"
    }
  ],
  "NM": [
    {
      "value": "501G2",
      "label": "LAS VEGAS (CBOC)"
    },
    {
      "value": "501GA",
      "label": "ARTESIA VA CLINIC"
    },
    {
      "value": "501GB",
      "label": "FARMINGTON VA CLINIC"
    },
    {
      "value": "501GC",
      "label": "SILVER CITY VA CLINIC"
    },
    {
      "value": "501GD",
      "label": "GALLUP VA CLINIC"
    },
    {
      "value": "501GE",
      "label": "ESPANOLA (CBOC)"
    },
    {
      "value": "501GH",
      "label": "TRUTH OR CONSEQUENCES (CBOC)"
    },
    {
      "value": "501GI",
      "label": "ALAMOGORDO VA CLINIC"
    },
    {
      "value": "501GK",
      "label": "SANTA FE VA CLINIC"
    },
    {
      "value": "501HB",
      "label": "RATON (CBOC)"
    },
    {
      "value": "504BZ",
      "label": "CLOVIS OUTPATIENT CLINIC"
    },
    {
      "value": "504HA",
      "label": "CLAYTON OUTPATIENT CLINIC"
    },
    {
      "value": "519GB",
      "label": "HOBBS CBOC"
    },
    {
      "value": "756GA",
      "label": "LAS CRUCES CBOC"
    },
    {
      "value": "501GM",
      "label": "NORTHWEST METRO VA CLINIC"
    },
    {
      "value": "501GN",
      "label": "TAOS VA CLINIC"
    },
    {
      "value": "501",
      "label": "RAYMOND G. MURPHY VAMC"
    }
  ],
  "LA": [
    {
      "value": "502GA",
      "label": "JENNINGS CBOC"
    },
    {
      "value": "502GB",
      "label": "LAFAYETTE VA CLINIC"
    },
    {
      "value": "629GA",
      "label": "HOUMA CBOC"
    },
    {
      "value": "629GB",
      "label": "HAMMOND CBOC"
    },
    {
      "value": "629GC",
      "label": "SLIDELL CBOC"
    },
    {
      "value": "629GD",
      "label": "ST. JOHN VA OUTPATIENT CLINIC"
    },
    {
      "value": "667GB",
      "label": "MONROE VA CLINIC"
    },
    {
      "value": "629BY",
      "label": "VA BATON ROUGE OUTPATIENT CLINIC"
    },
    {
      "value": "502GG",
      "label": "NATCHITOCHES VA CLINIC"
    },
    {
      "value": "629GE",
      "label": "FRANKLIN CBOC"
    },
    {
      "value": "629GF",
      "label": "BOGALUSA CBOC"
    },
    {
      "value": "502GF",
      "label": "FORT POLK VA CLINIC"
    },
    {
      "value": "502GE",
      "label": "LAKE CHARLES VA CLINIC"
    },
    {
      "value": "502QB",
      "label": "LAFAYETTE CAMPUS B VA CLINIC"
    },
    {
      "value": "502",
      "label": "ALEXANDRIA VA MEDICAL CENTER"
    },
    {
      "value": "629",
      "label": "NEW ORLEANS VAMC"
    },
    {
      "value": "667",
      "label": "OVERTON BROOKS VA MEDICAL CENTER"
    }
  ],
  "PA": [
    {
      "value": "503GA",
      "label": "JOHNSTOWN VA CLINIC"
    },
    {
      "value": "503GB",
      "label": "DUBOIS CBOC"
    },
    {
      "value": "503GC",
      "label": "STATE COLLEGE VA CLINIC"
    },
    {
      "value": "529GA",
      "label": "MICHAEL A. MARZANO VA OPC"
    },
    {
      "value": "529GB",
      "label": "LAWRENCE COUNTY VA CLINIC"
    },
    {
      "value": "529GC",
      "label": "ARMSTRONG COUNTY VA CLINIC"
    },
    {
      "value": "529GD",
      "label": "CLARION COUNTY VA CLINIC"
    },
    {
      "value": "542GA",
      "label": "DELAWARE COUNTY VA CLINIC"
    },
    {
      "value": "542GE",
      "label": "SPRING CITY VA CLINIC"
    },
    {
      "value": "562GA",
      "label": "CRAWFORD COUNTY VA CLINIC"
    },
    {
      "value": "562GC",
      "label": "MCKEAN COUNTY VA CLINIC"
    },
    {
      "value": "646GE",
      "label": "FAYETTE COUNTY VA CLINIC"
    },
    {
      "value": "693GG",
      "label": "NORTHAMPTON COUNTY CLINIC"
    },
    {
      "value": "595GA",
      "label": "CUMBERLAND COUNTY VA CLINIC"
    },
    {
      "value": "595GC",
      "label": "LANCASTER VA CLINIC"
    },
    {
      "value": "595GD",
      "label": "BERKS VA OUTPATIENT CLINIC"
    },
    {
      "value": "595GE",
      "label": "YORK VA CLINIC"
    },
    {
      "value": "642GC",
      "label": "VICTOR J. SARACINI VA OPC"
    },
    {
      "value": "646A4",
      "label": "H. JOHN HEINZ III VAMC"
    },
    {
      "value": "646GB",
      "label": "WESTMORELAND COUNTY VA CLINIC"
    },
    {
      "value": "646GC",
      "label": "BEAVER COUNTY VA CLINIC"
    },
    {
      "value": "646GD",
      "label": "WASHINGTON VA PRIMARY CARE OUTPATIENT CLINIC"
    },
    {
      "value": "693GE",
      "label": "SCHUYLKILL COUNTY CBOC"
    },
    {
      "value": "529GF",
      "label": "CRANBERRY TOWNSHIP VA CLINIC"
    },
    {
      "value": "693B4",
      "label": "ALLENTOWN OPC"
    },
    {
      "value": "693GA",
      "label": "SAYRE OPC"
    },
    {
      "value": "693GB",
      "label": "WILLIAMSPORT VA CLINIC"
    },
    {
      "value": "693GC",
      "label": "TOBYHANNA VA CLINIC"
    },
    {
      "value": "693GD",
      "label": "WILKES-BARRE (CBOC)"
    },
    {
      "value": "693GF",
      "label": "COLUMBIA COUNTY VA CLINIC"
    },
    {
      "value": "595GF",
      "label": "SCHUYLKILL COUNTY VA CLINIC"
    },
    {
      "value": "562GD",
      "label": "VENANGO COUNTY VA CLINIC"
    },
    {
      "value": "562GE",
      "label": "WARREN COUNTY CLINIC"
    },
    {
      "value": "503GD",
      "label": "HUNTINGDON COUNTY VA CLINIC"
    },
    {
      "value": "503GE",
      "label": "INDIANA COUNTY VA CLINIC"
    },
    {
      "value": "642QA",
      "label": "CHESTNUT STREET VA CLINIC"
    },
    {
      "value": "595QA",
      "label": "FORT INDIANTOWN GAP VA CLINIC"
    },
    {
      "value": "529A4",
      "label": "BUTLER VAMC"
    },
    {
      "value": "595",
      "label": "LEBANON VA MEDICAL CENTER"
    },
    {
      "value": "503",
      "label": "JAMES E VAN ZANDT VAMC"
    },
    {
      "value": "642",
      "label": "PHILADELPHIA, PA VAMC"
    },
    {
      "value": "646",
      "label": "PITTSBURGH VAMC UNIVERSITY DR."
    },
    {
      "value": "693",
      "label": "WILKES-BARRE VAMC"
    },
    {
      "value": "542",
      "label": "COATESVILLE VA MEDICAL CENTER"
    },
    {
      "value": "562",
      "label": "ERIE VA MEDICAL CENTER"
    },
    {
      "value": "529",
      "label": "ABIE ABRAHAM VA CLINIC"
    }
  ],
  "TX": [
    {
      "value": "504BY",
      "label": "LUBBOCK OUTPATIENT CLINIC"
    },
    {
      "value": "504GA",
      "label": "CHILDRESS VA CLINIC"
    },
    {
      "value": "504HB",
      "label": "DALHART CBOC"
    },
    {
      "value": "549GE",
      "label": "BRIDGEPORT VA CLINIC"
    },
    {
      "value": "549GF",
      "label": "GRANBURY VA CLINIC"
    },
    {
      "value": "549GH",
      "label": "GREENVILLE VA CLINIC TX"
    },
    {
      "value": "549GI",
      "label": "NORTH TEXAS HEALTH CARE SYSTEM - CLEBURNE CBOC"
    },
    {
      "value": "580BY",
      "label": "BEAUMONT"
    },
    {
      "value": "519GA",
      "label": "PERMIAN BASIN CBOC"
    },
    {
      "value": "519GD",
      "label": "FT. STOCKTON CBOC"
    },
    {
      "value": "519HC",
      "label": "ABILENE CBOC"
    },
    {
      "value": "519HD",
      "label": "STAMFORD CBOC"
    },
    {
      "value": "519HF",
      "label": "SAN ANGELO CBOC"
    },
    {
      "value": "549A4",
      "label": "SAM RAYBURN MEM VET CENTER"
    },
    {
      "value": "549BY",
      "label": "FORT WORTH VA CLINIC"
    },
    {
      "value": "549GA",
      "label": "TYLER VA CLINIC"
    },
    {
      "value": "549GB",
      "label": "NORTH TEXAS HEALTH CARE SYSTEM - DALLAS CBOC"
    },
    {
      "value": "549GC",
      "label": "BONHAM VA CLINIC"
    },
    {
      "value": "549GD",
      "label": "DENTON VA CLINIC"
    },
    {
      "value": "635GB",
      "label": "WICHITA FALLS CBOC VETERANS CLINIC OF NORTH TEXAS"
    },
    {
      "value": "580BZ",
      "label": "LUFKIN OUTPATIENT CLINIC"
    },
    {
      "value": "580GA",
      "label": "HOUSTON CBOC"
    },
    {
      "value": "580GC",
      "label": "GALVESTON COUNTY VA CLINIC"
    },
    {
      "value": "674GA",
      "label": "PALESTINE VA CLINIC"
    },
    {
      "value": "674GB",
      "label": "BROWNWOOD VA CLINIC"
    },
    {
      "value": "674GC",
      "label": "BRYAN VA CLINIC"
    },
    {
      "value": "674GD",
      "label": "CEDAR PARK VA CLINIC"
    },
    {
      "value": "671GO",
      "label": "NORTH CENTRAL FED VA CLINIC"
    },
    {
      "value": "667GC",
      "label": "LONGVIEW CBOC"
    },
    {
      "value": "671A4",
      "label": "KERRVILLE VA MEDICAL CENTER"
    },
    {
      "value": "671B0",
      "label": "SOUTH TEXAS HEALTH CARE SYSTEM - MC ALLEN OUTPATIENT CLINIC"
    },
    {
      "value": "671BY",
      "label": "FRANK M. TEJEDA VA OPC"
    },
    {
      "value": "671BZ",
      "label": "SOUTH TEXAS HEALTH CARE SYSTEM - CORPUS CHRISTI OUTPATIENT CLINIC"
    },
    {
      "value": "671GA",
      "label": "VA HARLINGEN OUTPATIENT CLINIC"
    },
    {
      "value": "671GB",
      "label": "VICTORIA VA CLINIC"
    },
    {
      "value": "671GC",
      "label": "DEL RIO VA CLINIC"
    },
    {
      "value": "671GD",
      "label": "UNITED MEDICAL CENTERS"
    },
    {
      "value": "671GE",
      "label": "SOUTH TEXAS HEALTH CARE SYSTEM - LAREDO OUTPATIENT CLINIC"
    },
    {
      "value": "671GF",
      "label": "SOUTH BEXAR COUNTY VA CLINIC"
    },
    {
      "value": "671GG",
      "label": "CHRISTUS SPOHN SAN DIEGO FAMILY HEALTH CLINIC"
    },
    {
      "value": "671GH",
      "label": "BEEVILLE VA CLINIC"
    },
    {
      "value": "671GI",
      "label": "CHRISTUS SPOHN BISHOP FAMILY HEALTH CLINIC"
    },
    {
      "value": "671GJ",
      "label": "UVALDE VA CLINIC"
    },
    {
      "value": "671GK",
      "label": "SAN ANTONIO VA CLINIC"
    },
    {
      "value": "671GL",
      "label": "NEW BRAUNFELS VA CLINIC"
    },
    {
      "value": "671GN",
      "label": "SEGUIN VA CLINIC"
    },
    {
      "value": "549GJ",
      "label": "SHERMAN VA CLINIC"
    },
    {
      "value": "674HB",
      "label": "LAGRANGE VA CLINIC"
    },
    {
      "value": "740GA",
      "label": "HARLINGEN OPC"
    },
    {
      "value": "740GC",
      "label": "CORPUS CHRISTI OPC"
    },
    {
      "value": "740GD",
      "label": "LAREDO OPC"
    },
    {
      "value": "740GB",
      "label": "MCALLEN OPC"
    },
    {
      "value": "740GE",
      "label": "EAGLE PASS CBOC"
    },
    {
      "value": "756GB",
      "label": "EL PASO EASTSIDE CBOC"
    },
    {
      "value": "580GF",
      "label": "LAKE JACKSON CBOC"
    },
    {
      "value": "580GG",
      "label": "RICHMOND CBOC"
    },
    {
      "value": "674A4",
      "label": "WACO, TX VAMC"
    },
    {
      "value": "674BY",
      "label": "AUSTIN VA CLINIC"
    },
    {
      "value": "580GD",
      "label": "CONROE CBOC"
    },
    {
      "value": "580GE",
      "label": "KATY CBOC"
    },
    {
      "value": "580GH",
      "label": "TOMBALL CBOC"
    },
    {
      "value": "671GP",
      "label": "BALCONES HEIGHTS VA CLINIC"
    },
    {
      "value": "740GH",
      "label": "SOUTH ENTERPRIZE VA CLINIC"
    },
    {
      "value": "740GJ",
      "label": "NORTH TENTH STREET VA CLINIC"
    },
    {
      "value": "671GQ",
      "label": "SHAVANO PARK VA CLINIC"
    },
    {
      "value": "674GF",
      "label": "TEMPLE VA CLINIC"
    },
    {
      "value": "740GI",
      "label": "OLD BROWNSVILLE VA CLINIC"
    },
    {
      "value": "549GM",
      "label": "GRAND PRAIRIE VA CLINIC"
    },
    {
      "value": "549GL",
      "label": "PLANO VA CLINIC"
    },
    {
      "value": "549GK",
      "label": "POLK STREET VA CLINIC"
    },
    {
      "value": "580GJ",
      "label": "TEXAS CITY VA CLINIC"
    },
    {
      "value": "504",
      "label": "AMARILLO HCS"
    },
    {
      "value": "519",
      "label": "WEST TEXAS VA HEALTH CARE SYSTEM - BIG SPRING DIVISION"
    },
    {
      "value": "671",
      "label": "AUDIE L. MURPHY MEMORIAL HOSP"
    },
    {
      "value": "674",
      "label": "OLIN E. TEAGUE VET CENTER"
    },
    {
      "value": "756",
      "label": "EL PASO HCS"
    },
    {
      "value": "549",
      "label": "DALLAS VA MEDICAL CENTER"
    },
    {
      "value": "580",
      "label": "MICHAEL E. DEBAKEY VA MEDICAL CENTER"
    },
    {
      "value": "740",
      "label": "HARLINGEN VA CLINIC"
    }
  ],
  "OH": [
    {
      "value": "564GF",
      "label": "SPRINGFIELD CBOC"
    },
    {
      "value": "506GA",
      "label": "TOLEDO VA CLINIC"
    },
    {
      "value": "539GB",
      "label": "CINCINNATI (CLERMONT COUNTY)"
    },
    {
      "value": "541BY",
      "label": "CANTON CBOC"
    },
    {
      "value": "541BZ",
      "label": "YOUNGSTOWN CBOC"
    },
    {
      "value": "541GB",
      "label": "LORAIN CBOC"
    },
    {
      "value": "541GC",
      "label": "SANDUSKY CBOC"
    },
    {
      "value": "541GD",
      "label": "MANSFIELD CBOC"
    },
    {
      "value": "538GA",
      "label": "ATHENS VA CLINIC"
    },
    {
      "value": "538GB",
      "label": "PORTSMOUTH VA CLINIC"
    },
    {
      "value": "538GC",
      "label": "MARIETTA VA CLINIC"
    },
    {
      "value": "538GD",
      "label": "LANCASTER VA CLINIC"
    },
    {
      "value": "552GA",
      "label": "MIDDLETOWN CBOC"
    },
    {
      "value": "552GB",
      "label": "LIMA CBOC"
    },
    {
      "value": "552GD",
      "label": "SPRINGFIELD CBOC"
    },
    {
      "value": "541GE",
      "label": "MCCAFERTY CBOC"
    },
    {
      "value": "541GF",
      "label": "PAINSVILLE CBOC"
    },
    {
      "value": "541GG",
      "label": "AKRON CBOC"
    },
    {
      "value": "541GH",
      "label": "EAST LIVERPOOL CBOC"
    },
    {
      "value": "541GI",
      "label": "WARREN CBOC"
    },
    {
      "value": "562GB",
      "label": "ASHTABULA COUNTY VA CLINIC"
    },
    {
      "value": "757GB",
      "label": "GROVE CITY CBOC"
    },
    {
      "value": "541GJ",
      "label": "NEW PHILADELPHIA CBOC"
    },
    {
      "value": "541GK",
      "label": "RAVENNA CBOC"
    },
    {
      "value": "757GC",
      "label": "MARION CBOC"
    },
    {
      "value": "646GA",
      "label": "BELMONT COUNTY VA CLINIC"
    },
    {
      "value": "538GE",
      "label": "CAMBRIDGE VA CLINIC"
    },
    {
      "value": "757GD",
      "label": "NEWARK CBOC"
    },
    {
      "value": "757GA",
      "label": "ZANESVILLE CBOC"
    },
    {
      "value": "539GE",
      "label": "HAMILTON OHIO CBOC"
    },
    {
      "value": "539GF",
      "label": "GEORGETOWN CBOC"
    },
    {
      "value": "541GL",
      "label": "PARMA CBOC"
    },
    {
      "value": "541GM",
      "label": "CLEVELAND AMBULATORY CTR CBOC"
    },
    {
      "value": "538GF",
      "label": "WILMINGTON VA CLINIC (OH)"
    },
    {
      "value": "541GN",
      "label": "STATE STREET VA CLINIC"
    },
    {
      "value": "581GG",
      "label": "GALLIPOLIS VA CLINIC"
    },
    {
      "value": "539QC",
      "label": "VINE STREET VA CLINIC"
    },
    {
      "value": "757",
      "label": "CHALMERS P. WYLIE VA AMBULATORY CARE CENTER (757)"
    },
    {
      "value": "538",
      "label": "CHILLICOTHE VA MEDICAL CENTER"
    },
    {
      "value": "539",
      "label": "CINCINNATI VAMC"
    },
    {
      "value": "541",
      "label": "CLEVELAND VAMC"
    },
    {
      "value": "552",
      "label": "DAYTON, OH VAMC"
    }
  ],
  "MI": [
    {
      "value": "506GB",
      "label": "FLINT VA CLINIC"
    },
    {
      "value": "506GC",
      "label": "JACKSON CBOC"
    },
    {
      "value": "553GA",
      "label": "YALE VA CLINIC"
    },
    {
      "value": "553GB",
      "label": "PONTIAC VA CLINIC"
    },
    {
      "value": "515BY",
      "label": "WYOMING HEALTH CARE CENTER"
    },
    {
      "value": "515GA",
      "label": "MUSKEGON VA CLINIC"
    },
    {
      "value": "515GB",
      "label": "LANSING CBOC"
    },
    {
      "value": "515GC",
      "label": "BENTON HARBOR VA CLINIC"
    },
    {
      "value": "585GA",
      "label": "HANCOCK CBOC"
    },
    {
      "value": "585GC",
      "label": "MENOMINEE CBOC"
    },
    {
      "value": "585GD",
      "label": "IRONWOOD CBOC"
    },
    {
      "value": "585HA",
      "label": "MARQUETTE CBOC"
    },
    {
      "value": "585HB",
      "label": "SAULT SAINT MARIE CBOC"
    },
    {
      "value": "655GA",
      "label": "GAYLORD VA OUTPATIENT CLINIC"
    },
    {
      "value": "655GB",
      "label": "TRAVERSE CITY VA CLINIC"
    },
    {
      "value": "655GC",
      "label": "OSCODA VA CLINIC"
    },
    {
      "value": "655GD",
      "label": "LT. COL CLEMENT VAN WAGONER VA"
    },
    {
      "value": "655GH",
      "label": "CHEBOYGAN COUNTY VA CLINIC"
    },
    {
      "value": "655GI",
      "label": "GRAYLING VA CLINIC"
    },
    {
      "value": "655GF",
      "label": "BAD AXE VA CLINIC"
    },
    {
      "value": "655GE",
      "label": "CLARE VA CLINIC"
    },
    {
      "value": "655GG",
      "label": "CADILLAC VA CLINIC"
    },
    {
      "value": "506",
      "label": "ANN ARBOR VA MEDICAL CENTER"
    },
    {
      "value": "515",
      "label": "BATTLE CREEK VA MEDICAL CENTER"
    },
    {
      "value": "655",
      "label": "ALEDA E. LUTZ VAMC"
    },
    {
      "value": "553",
      "label": "JOHN D. DINGELL VAMC"
    },
    {
      "value": "585",
      "label": "IRON MOUNTAIN VA MEDICAL CENTER"
    }
  ],
  "GA": [
    {
      "value": "508GA",
      "label": "ATLANTA VA CBOC"
    },
    {
      "value": "508GE",
      "label": "OAKWOOD VA CLINIC"
    },
    {
      "value": "508GF",
      "label": "AUSTELL CBOC"
    },
    {
      "value": "508GH",
      "label": "LAWRENCEVILLE CBOC"
    },
    {
      "value": "509A0",
      "label": "AUGUSTA VAMC - UPTOWN"
    },
    {
      "value": "534BY",
      "label": "SAVANNAH PRIMARY CARE CLINIC"
    },
    {
      "value": "557GA",
      "label": "MACON VA CBOC"
    },
    {
      "value": "557GB",
      "label": "ALBANY VA CBOC"
    },
    {
      "value": "573GA",
      "label": "VALDOSTA VA CLINIC"
    },
    {
      "value": "619GA",
      "label": "CENTRAL ALABAMA HCS - COLUMBUS CBOC"
    },
    {
      "value": "509GA",
      "label": "ATHENS CBOC"
    },
    {
      "value": "557HA",
      "label": "PERRY OUTREACH CLINIC"
    },
    {
      "value": "508GG",
      "label": "STOCKBRIDGE CBOC"
    },
    {
      "value": "573GJ",
      "label": "ST. MARYS VA CLINIC"
    },
    {
      "value": "508GI",
      "label": "NEWNAN CBOC"
    },
    {
      "value": "508GK",
      "label": "CARROLLTON CBOC"
    },
    {
      "value": "557GC",
      "label": "BALDWIN CBOC"
    },
    {
      "value": "508GJ",
      "label": "BLAIRSVILLE CBOC"
    },
    {
      "value": "557GE",
      "label": "BRUNSWICK CBOC"
    },
    {
      "value": "534GE",
      "label": "HINESVILLE CBOC"
    },
    {
      "value": "557GF",
      "label": "TIFTON VA CLINIC"
    },
    {
      "value": "619QB",
      "label": "FORT BENNING VA CLINIC"
    },
    {
      "value": "573GM",
      "label": "WAYCROSS VA CLINIC"
    },
    {
      "value": "508GL",
      "label": "ROME VA CLINIC"
    },
    {
      "value": "509QA",
      "label": "STATESBORO VA CLINIC"
    },
    {
      "value": "508",
      "label": "ATLANTA VAMC"
    },
    {
      "value": "509",
      "label": "AUGUSTA VAMC"
    },
    {
      "value": "557",
      "label": "DUBLIN"
    }
  ],
  "MD": [
    {
      "value": "512GA",
      "label": "CAMBRIDGE VA CLINIC"
    },
    {
      "value": "512GC",
      "label": "GLEN BURNIE VA CLINIC"
    },
    {
      "value": "512GD",
      "label": "LOCH RAVEN VAMC"
    },
    {
      "value": "512GE",
      "label": "POCOMOKE CITY VA CLINIC"
    },
    {
      "value": "512GF",
      "label": "E. BALTIMORE COUNTY VA CLINIC"
    },
    {
      "value": "460HM",
      "label": "MILLINTON MORC"
    },
    {
      "value": "613GA",
      "label": "CUMBERLAND CBOC"
    },
    {
      "value": "613GB",
      "label": "HAGERSTOWN VA CLINIC"
    },
    {
      "value": "688GC",
      "label": "GREENBELT VA CLINIC"
    },
    {
      "value": "688GD",
      "label": "CHARLOTTE HALL VA CLINIC"
    },
    {
      "value": "512A5",
      "label": "PERRY POINT VAMC"
    },
    {
      "value": "688GE",
      "label": "S PRINCE GEORGES CITY VA CLINIC"
    },
    {
      "value": "613GG",
      "label": "FORT DETRICK VA CLINIC"
    },
    {
      "value": "512GG",
      "label": "FORT MEADE VA CLINIC"
    },
    {
      "value": "512QA",
      "label": "BALTIMORE VA CLINIC"
    },
    {
      "value": "688GF",
      "label": "MONTGOMERY COUNTY VA CLINIC"
    },
    {
      "value": "512",
      "label": "VA MARYLAND HEALTH CARE SYS"
    }
  ],
  "KY": [
    {
      "value": "539GA",
      "label": "BELLEVUE CBOC"
    },
    {
      "value": "626GC",
      "label": "BOWLING GREEN COMMUNITY BASED OUTPATIENT CLINIC"
    },
    {
      "value": "581GA",
      "label": "PRESTONSBURG CBOC"
    },
    {
      "value": "603GD",
      "label": "DUPONT VA CLINIC"
    },
    {
      "value": "603GE",
      "label": "NEWBURG VA CLINIC"
    },
    {
      "value": "596A4",
      "label": "LEXINGTON VETERANS AFFAIRS MEDICAL CENTER"
    },
    {
      "value": "596GA",
      "label": "SOMERSET VA CLINIC"
    },
    {
      "value": "596HA",
      "label": "LEXINGTON MOBILE OUTREACH CLINIC"
    },
    {
      "value": "603GA",
      "label": "VA HEALTHCARE CENTER, FT. KNOX"
    },
    {
      "value": "603GC",
      "label": "SHIVELY VA CLINIC"
    },
    {
      "value": "539GD",
      "label": "FLORENCE CBOC"
    },
    {
      "value": "596GD",
      "label": "BEREA VA CLINIC"
    },
    {
      "value": "596GC",
      "label": "HAZARD VA CLINIC"
    },
    {
      "value": "603GF",
      "label": "GRAYSON COUNTY VA CLINIC"
    },
    {
      "value": "603GH",
      "label": "CARROLLTON VA CLINIC"
    },
    {
      "value": "596GB",
      "label": "MOREHEAD VA CLINIC"
    },
    {
      "value": "626GJ",
      "label": "HOPKINSVILLE VA CLINIC"
    },
    {
      "value": "539A4",
      "label": "CINCINNATI VAMC FORT THOMAS"
    },
    {
      "value": "596",
      "label": "LEXINGTON VAMC-LEESTOWN"
    },
    {
      "value": "603",
      "label": "ROBLEY REX VAMC"
    }
  ],
  "IN": [
    {
      "value": "539GC",
      "label": "LAWRENCEBURG (DEARBORN COUNTY)"
    },
    {
      "value": "537BY",
      "label": "ADAM BENJAMIN JR OPC"
    },
    {
      "value": "550GC",
      "label": "LAFAYETTE, IN CBOC"
    },
    {
      "value": "552GC",
      "label": "RICHMOND CBOC"
    },
    {
      "value": "610A4",
      "label": "FORT WAYNE VA MEDICAL CENTER"
    },
    {
      "value": "610GA",
      "label": "SOUTH BEND VA CLINIC"
    },
    {
      "value": "610GB",
      "label": "MUNCIE VA CLINIC"
    },
    {
      "value": "583GA",
      "label": "TERRE HAUTE VA CLINIC"
    },
    {
      "value": "583GB",
      "label": "BLOOMINGTON VA CLINIC"
    },
    {
      "value": "603GB",
      "label": "NEW ALBANY VA CLINIC"
    },
    {
      "value": "603GG",
      "label": "SCOTT COUNTY VA CLINIC"
    },
    {
      "value": "610GC",
      "label": "GOSHEN VA CLINIC"
    },
    {
      "value": "610GD",
      "label": "PERU VA CLINIC"
    },
    {
      "value": "583GC",
      "label": "MARTINSVILLE VA CLINIC"
    },
    {
      "value": "583GE",
      "label": "WEST LAFAYETTE VA CLINIC"
    },
    {
      "value": "583GD",
      "label": "INDIANAPOLIS WEST VA CLINIC"
    },
    {
      "value": "583QB",
      "label": "INDIANAPOLIS VA CLINIC"
    },
    {
      "value": "583GG",
      "label": "SHELBYVILLE VA CLINIC"
    },
    {
      "value": "583QD",
      "label": "INDIANAPOLIS YMCA VA CLINIC"
    },
    {
      "value": "610",
      "label": "MARION VA MEDICAL CENTER"
    },
    {
      "value": "583",
      "label": "RICHARD L. ROUDEBUSH VAMC"
    }
  ],
  "WV": [
    {
      "value": "540GA",
      "label": "TUCKER COUNTY VA CLINIC"
    },
    {
      "value": "540GB",
      "label": "CLARKSBURG/WOOD"
    },
    {
      "value": "540GC",
      "label": "BRAXTON COUNTY VA CLINIC"
    },
    {
      "value": "613GD",
      "label": "FRANKLIN VA CLINIC"
    },
    {
      "value": "613GE",
      "label": "PETERSBURG VA CLINIC"
    },
    {
      "value": "613HK",
      "label": "MOBILE VAN CLINIC MORC"
    },
    {
      "value": "581GB",
      "label": "CHARLESTON VA CLINIC"
    },
    {
      "value": "540HK",
      "label": "CLARKSBURG VA MOBILE CLINIC"
    },
    {
      "value": "540GD",
      "label": "MONONGALIA COUNTY VA CLINIC"
    },
    {
      "value": "517GB",
      "label": "GREENBRIER COUNTY VA CLINIC"
    },
    {
      "value": "581GH",
      "label": "LENORE VA CLINIC"
    },
    {
      "value": "517",
      "label": "BECKLEY VA MEDICAL CENTER"
    },
    {
      "value": "613",
      "label": "MARTINSBURG VA MEDICAL CENTER"
    },
    {
      "value": "540",
      "label": "LOUIS A JOHNSON VAMC"
    },
    {
      "value": "581",
      "label": "HUNTINGTON VAMC"
    }
  ],
  "SC": [
    {
      "value": "544BZ",
      "label": "GREENVILLE VA CLINIC SC"
    },
    {
      "value": "544GB",
      "label": "FLORENCE CBOC"
    },
    {
      "value": "544GC",
      "label": "ROCK HILL CBOC"
    },
    {
      "value": "544GD",
      "label": "ANDERSON CBOC"
    },
    {
      "value": "544GE",
      "label": "ORANGEBURG CBOC"
    },
    {
      "value": "544GF",
      "label": "SUMTER CBOC"
    },
    {
      "value": "534GB",
      "label": "MYRTLE  BEACH PRIMARY CARE CLINIC"
    },
    {
      "value": "534GC",
      "label": "BEAUFORT PRIMARY CARE CLINIC"
    },
    {
      "value": "509GB",
      "label": "AIKEN CBOC"
    },
    {
      "value": "534GD",
      "label": "GOOSE CREEK CBOC"
    },
    {
      "value": "544GG",
      "label": "SPARTANBURG CBOC"
    },
    {
      "value": "534GF",
      "label": "NORTH CHARLESTON VA CBOC"
    },
    {
      "value": "544",
      "label": "WM JENNINGS BRYAN DORN VETERANS AFFAIRS MEDICAL CENTER"
    },
    {
      "value": "534",
      "label": "RALPH H. JOHNSON VA MEDICAL CENTER (534)"
    }
  ],
  "FL": [
    {
      "value": "546B0",
      "label": "MIAMI (OCS)"
    },
    {
      "value": "546BZ",
      "label": "WILLIAM BILL KLING VAOC"
    },
    {
      "value": "546GA",
      "label": "MIAMI (ALCOHOL/DRUG)"
    },
    {
      "value": "546GB",
      "label": "KEY WEST CBOC"
    },
    {
      "value": "546GC",
      "label": "HOMESTEAD VA CLINIC"
    },
    {
      "value": "516BZ",
      "label": "LEE COUNTY VA CLINIC"
    },
    {
      "value": "516GA",
      "label": "SARASOTA COUNTY CBOC"
    },
    {
      "value": "516GB",
      "label": "ST. PETERSBURG VA CLINIC"
    },
    {
      "value": "516GC",
      "label": "PALM HARBOR VA CLINIC"
    },
    {
      "value": "516GD",
      "label": "BRADENTON VA CLINIC"
    },
    {
      "value": "516GE",
      "label": "PORT CHARLOTTE VA CLINIC"
    },
    {
      "value": "516GF",
      "label": "NAPLES VA CLINIC"
    },
    {
      "value": "573A4",
      "label": "LAKE CITY VA MEDICAL CENTER"
    },
    {
      "value": "573BY",
      "label": "JACKSONVILLE 1 VA CLINIC"
    },
    {
      "value": "573GB",
      "label": "JACKSONVILLE CBOC"
    },
    {
      "value": "573GD",
      "label": "OCALA VA CLINIC"
    },
    {
      "value": "573GE",
      "label": "SAINT AUGUSTINE VA CLINIC"
    },
    {
      "value": "573GF",
      "label": "TALLAHASSEE VA CLINIC"
    },
    {
      "value": "573GG",
      "label": "LECANTO VA CLINIC"
    },
    {
      "value": "516GH",
      "label": "SEBRING VA CLINIC"
    },
    {
      "value": "520BZ",
      "label": "PENSACOLA VA CLINIC"
    },
    {
      "value": "520GB",
      "label": "PANAMA CITY BEACH VA CLINIC"
    },
    {
      "value": "546GD",
      "label": "PEMBROKE PINES VA CLINIC"
    },
    {
      "value": "546GE",
      "label": "KEY LARGO VA CLINIC"
    },
    {
      "value": "548GA",
      "label": "FORT PIERCE VA CLINIC"
    },
    {
      "value": "548GB",
      "label": "DELRAY BEACH VA CLINIC"
    },
    {
      "value": "548GC",
      "label": "STUART VA CLINIC"
    },
    {
      "value": "548GD",
      "label": "BOCA RATON CBOC"
    },
    {
      "value": "548GE",
      "label": "VERO BEACH VA CLINIC"
    },
    {
      "value": "548GF",
      "label": "OKEECHOBEE VA CLINIC"
    },
    {
      "value": "573GI",
      "label": "THE VILLAGES VA CLINIC"
    },
    {
      "value": "675GA",
      "label": "VIERA VA CLINIC"
    },
    {
      "value": "675GE",
      "label": "TAVARES VA CLINIC"
    },
    {
      "value": "675GF",
      "label": "CLERMONT CBOC"
    },
    {
      "value": "520GC",
      "label": "EGLIN AIR FORCE BASE VA CLINIC"
    },
    {
      "value": "573GK",
      "label": "MARIANNA VA CLINIC"
    },
    {
      "value": "675GD",
      "label": "ORANGE CITY VA CLINIC"
    },
    {
      "value": "675GB",
      "label": "WILLIAM V. CHAPPELL, JR. VOC"
    },
    {
      "value": "675GC",
      "label": "KISSIMMEE VA CLINIC"
    },
    {
      "value": "675GG",
      "label": "LAKE BALDWIN VA CLINIC"
    },
    {
      "value": "573GL",
      "label": "PALATKA VA CLINIC"
    },
    {
      "value": "673BZ",
      "label": "PORT RICHEY OUTPATIENT CLINIC"
    },
    {
      "value": "673GB",
      "label": "LAKELAND VA CLINIC"
    },
    {
      "value": "673GC",
      "label": "BROOKSVILLE CBOC"
    },
    {
      "value": "673GF",
      "label": "ZEPHYRHILLS VA CLINIC"
    },
    {
      "value": "546GF",
      "label": "HOLLYWOOD VA CLINIC"
    },
    {
      "value": "546GH",
      "label": "DEERFIELD BEACH CLINIC"
    },
    {
      "value": "520QA",
      "label": "PANAMA CITY BEACH WEST VA CLIN"
    },
    {
      "value": "573GN",
      "label": "PERRY VA CLINIC"
    },
    {
      "value": "573QK",
      "label": "LAKE CITY VA CLINIC"
    },
    {
      "value": "516",
      "label": "C.W. BILL YOUNG DEPT OF VAMC"
    },
    {
      "value": "673",
      "label": "JAMES A. HALEY VETERANS HOSP"
    },
    {
      "value": "546",
      "label": "BRUCE W. CARTER DEPT OF VAMC"
    },
    {
      "value": "548",
      "label": "WEST PALM BEACH VAMC"
    },
    {
      "value": "573",
      "label": "MALCOM RANDALL DEPT OF VAMC"
    },
    {
      "value": "675",
      "label": "ORLANDO VAMC"
    }
  ],
  "NY": [
    {
      "value": "528A4",
      "label": "VA HEALTHCARE NETWORK UPSTATE NEW YORK SYSTEM VISN 2 - BATAVIA DIVISION"
    },
    {
      "value": "528A5",
      "label": "CANANDAIGUA VA MEDICAL CENTER"
    },
    {
      "value": "528A6",
      "label": "BATH VA MEDICAL CENTER"
    },
    {
      "value": "528A7",
      "label": "SYRACUSE VA MEDICAL CENTER"
    },
    {
      "value": "528A8",
      "label": "SAMUEL S. STRATTON VAMC"
    },
    {
      "value": "528GB",
      "label": "JAMESTOWN VA CLINIC"
    },
    {
      "value": "528GC",
      "label": "DUNKIRK VA CLINIC"
    },
    {
      "value": "528GD",
      "label": "NIAGARA FALLS VA CLINIC"
    },
    {
      "value": "528GK",
      "label": "LOCKPORT"
    },
    {
      "value": "528GQ",
      "label": "LACKAWANNA CBOC"
    },
    {
      "value": "528GR",
      "label": "OLEAN CBOC"
    },
    {
      "value": "526GA",
      "label": "WHITE PLAINS CLINIC"
    },
    {
      "value": "526GB",
      "label": "YONKERS CLINIC"
    },
    {
      "value": "526GD",
      "label": "NORTH QUEENS CLINIC"
    },
    {
      "value": "630A4",
      "label": "VA NEW YORK HARBOR HEALTHCARE SYSTEM - BROOKLYN DIVISION"
    },
    {
      "value": "630A5",
      "label": "ST ALBANS EXTENDED CARE CNTR"
    },
    {
      "value": "630GA",
      "label": "HARLEM CBOC-NYHHS"
    },
    {
      "value": "630GB",
      "label": "STATEN ISLAND CBOC-NYHHCS"
    },
    {
      "value": "630GC",
      "label": "CHAPEL STREET OPC"
    },
    {
      "value": "632GA",
      "label": "EAST MEADOW CBOC"
    },
    {
      "value": "632HA",
      "label": "VALLEY STREAM CBOC"
    },
    {
      "value": "632HB",
      "label": "RIVERHEAD,NY ORC"
    },
    {
      "value": "632HC",
      "label": "BAY SHORE CBOC"
    },
    {
      "value": "632HD",
      "label": "PATCHOGUE,NY ORC"
    },
    {
      "value": "620A4",
      "label": "VA HUDSON VALLEY HEALTH CARE - CASTLE POINT DIVISION"
    },
    {
      "value": "620GA",
      "label": "NEW CITY"
    },
    {
      "value": "620GB",
      "label": "PUTNAM COUNTY"
    },
    {
      "value": "620GD",
      "label": "GOSHEN CBOC"
    },
    {
      "value": "620GE",
      "label": "PORT JERVIS"
    },
    {
      "value": "620GF",
      "label": "HARRIS"
    },
    {
      "value": "620GG",
      "label": "POUGHKEEPSIE"
    },
    {
      "value": "620GH",
      "label": "EASTERN DUTCHESS CBOC"
    },
    {
      "value": "620",
      "label": "VA HUDSON VALLEY HEALTH CARE SYSTEM - MONTROSE DIVISION"
    },
    {
      "value": "630",
      "label": "VA NEW YORK HARBOR HEALTHCARE SYSTEM - NEW YORK DIVISION"
    },
    {
      "value": "632",
      "label": "NORTHPORT VAMC NY"
    },
    {
      "value": "526",
      "label": "BRONX VA HOSPITAL"
    },
    {
      "value": "528",
      "label": "BUFFALO VA MEDICAL CENTER"
    }
  ],
  "ID": [
    {
      "value": "531GE",
      "label": "TWIN FALLS VA CLINIC"
    },
    {
      "value": "687GB",
      "label": "LEWISTON VA CLINIC"
    },
    {
      "value": "668GB",
      "label": "COEUR D ALENE VA CLINIC"
    },
    {
      "value": "660GA",
      "label": "POCATELLO VA CLINIC"
    },
    {
      "value": "531GG",
      "label": "CALDWELL VA CLINIC"
    },
    {
      "value": "531GI",
      "label": "MOUNTAIN HOME VA CLINIC"
    },
    {
      "value": "531GJ",
      "label": "SALMON VA CLINIC"
    },
    {
      "value": "531",
      "label": "BOISE VA MEDICAL CENTER"
    }
  ],
  "IL": [
    {
      "value": "537GA",
      "label": "CHICAGO HEIGHTS CBOC"
    },
    {
      "value": "537HA",
      "label": "BEVERLY CBOC"
    },
    {
      "value": "550BY",
      "label": "BOB MICHEL VA OPC"
    },
    {
      "value": "550GA",
      "label": "DECATUR VA CLINIC"
    },
    {
      "value": "550GD",
      "label": "SPRINGFIELD VA CLINIC"
    },
    {
      "value": "556GA",
      "label": "EVANSTON CBOC"
    },
    {
      "value": "556GC",
      "label": "MCHENRY CBOC"
    },
    {
      "value": "578GA",
      "label": "JOLIET CBOC (578GA)"
    },
    {
      "value": "578GD",
      "label": "AURORA CBOC (578GD)"
    },
    {
      "value": "578GF",
      "label": "LASSALLE CBOC (578GF)"
    },
    {
      "value": "578GG",
      "label": "OAK LAWN CBOC (578GG)"
    },
    {
      "value": "607HA",
      "label": "ROCKFORD, IL OPC"
    },
    {
      "value": "657A5",
      "label": "MARION VA MEDICAL CENTER"
    },
    {
      "value": "657GA",
      "label": "ST. CLAIR CNTY VA CLINIC"
    },
    {
      "value": "537GD",
      "label": "LAKESIDE CBOC"
    },
    {
      "value": "607GF",
      "label": "FREEPORT CBOC"
    },
    {
      "value": "550GF",
      "label": "MATTOON VA CLINIC"
    },
    {
      "value": "578GC",
      "label": "KANKAKEE COUNTY CBOC"
    },
    {
      "value": "578GE",
      "label": "HOFFMAN ESTATES VA CLINIC"
    },
    {
      "value": "537",
      "label": "JESSE BROWN VA MEDICAL CENTER"
    },
    {
      "value": "550",
      "label": "DANVILLE VA MEDICAL CENTER"
    },
    {
      "value": "556",
      "label": "CAPTN JAMES LOVELL FED HLT CTR"
    },
    {
      "value": "578",
      "label": "EDWARD J. HINES JR. HOSPITAL"
    }
  ],
  "WI": [
    {
      "value": "556GD",
      "label": "KENOSHA CBOC"
    },
    {
      "value": "585GB",
      "label": "RHINELANDER CBOC"
    },
    {
      "value": "618BY",
      "label": "TWIN PORTS CBOC"
    },
    {
      "value": "607GC",
      "label": "JANESVILLE, WI CBOC"
    },
    {
      "value": "607GD",
      "label": "BARABOO, WI CBOC"
    },
    {
      "value": "607GE",
      "label": "BEAVER DAM, WI CBOC"
    },
    {
      "value": "618GE",
      "label": "CHIPPEWA VALLEY CBOC"
    },
    {
      "value": "676GA",
      "label": "WAUSAU CBOC"
    },
    {
      "value": "676GB",
      "label": "LEAVENWORTH, WI CBOC"
    },
    {
      "value": "676GC",
      "label": "LACROSSE CBOC"
    },
    {
      "value": "695GD",
      "label": "MILO C. HUEMPFNER CBOC"
    },
    {
      "value": "676GD",
      "label": "WISCONSIN RAPIDS CBOC"
    },
    {
      "value": "676GE",
      "label": "CLARK COUNTY CBOC"
    },
    {
      "value": "695BY",
      "label": "FOX VALLEY"
    },
    {
      "value": "695GA",
      "label": "UNION GROVE"
    },
    {
      "value": "695GC",
      "label": "CLEVELAND CBOC"
    },
    {
      "value": "695HK",
      "label": "CLEMENT J ZABLOCKI"
    },
    {
      "value": "618GH",
      "label": "HAYWARD CBOC"
    },
    {
      "value": "618GM",
      "label": "RICE LAKE VA CBOC"
    },
    {
      "value": "607GG",
      "label": "MADISON WEST VA CLINIC"
    },
    {
      "value": "607",
      "label": "WILLIAM S. MIDDLETON MEMORIAL VA HOSPITAL"
    },
    {
      "value": "676",
      "label": "TOMAH VAMC"
    },
    {
      "value": "695",
      "label": "CLEMENT J ZABLOCKI"
    }
  ],
  "NC": [
    {
      "value": "558GA",
      "label": "GREENVILLE VA CLINIC NC"
    },
    {
      "value": "558GB",
      "label": "RALEIGH VA CLINIC"
    },
    {
      "value": "558GC",
      "label": "MOREHEAD CITY VA CLINIC"
    },
    {
      "value": "565GA",
      "label": "JACKSONVILLE VA CLINIC"
    },
    {
      "value": "565GC",
      "label": "WILMINGTON VA CLINIC (NC)"
    },
    {
      "value": "659GB",
      "label": "HICKORY CBOC"
    },
    {
      "value": "659BY",
      "label": "KERNERSVILLE VA CLINIC"
    },
    {
      "value": "659GA",
      "label": "NORTH CHARLOTTE VA CLINIC"
    },
    {
      "value": "565GD",
      "label": "HAMLET VA CLINIC"
    },
    {
      "value": "590GC",
      "label": "ALBEMARLE VA CLINIC"
    },
    {
      "value": "637GB",
      "label": "RUTHERFORD COUNTY VA CLINIC"
    },
    {
      "value": "565GE",
      "label": "ROBESON COUNTY VA CLINIC"
    },
    {
      "value": "637GA",
      "label": "FRANKLIN VA CLINIC"
    },
    {
      "value": "565GF",
      "label": "GOLDSBORO VA CLINIC"
    },
    {
      "value": "565GG",
      "label": "LEE COUNTY VA CLINIC"
    },
    {
      "value": "659GC",
      "label": "PETERS CREEK VA CLINIC"
    },
    {
      "value": "637GC",
      "label": "HICKORY VA CLINIC"
    },
    {
      "value": "565GL",
      "label": "CUMBERLAND COUNTY VA CLINIC"
    },
    {
      "value": "659BZ",
      "label": "SOUTH CHARLOTTE VA CLINIC"
    },
    {
      "value": "558GD",
      "label": "DURHAM COUNTY VA CLINIC"
    },
    {
      "value": "558GE",
      "label": "HILLANDALE ROAD VA CLINIC"
    },
    {
      "value": "558GF",
      "label": "WAKE COUNTY VA CLINIC"
    },
    {
      "value": "565GH",
      "label": "BRUNSWICK COUNTY VA CLINIC"
    },
    {
      "value": "565GI",
      "label": "VILLAGE GREEN VA CLINIC"
    },
    {
      "value": "565GK",
      "label": "FAYETTEVILLE VA CLINIC"
    },
    {
      "value": "565QC",
      "label": "FAYETTEVILLE 2 MOBILE CLINIC"
    },
    {
      "value": "565QD",
      "label": "RAEFORD ROAD VA CLINIC"
    },
    {
      "value": "565GM",
      "label": "JACKSONVILLE 3 VA CLINIC"
    },
    {
      "value": "637",
      "label": "CHARLES GEORGE VAMC"
    },
    {
      "value": "659",
      "label": "W.G. HEFNER SALISBURY VAMC"
    },
    {
      "value": "558",
      "label": "DURHAM VA MEDICAL CENTER"
    },
    {
      "value": "565",
      "label": "FAYETTEVILLE VA MEDICAL CENTER"
    }
  ],
  "NJ": [
    {
      "value": "561A4",
      "label": "NEW JERSEY HEALTH CARE SYSTEM - LYONS CAMPUS"
    },
    {
      "value": "561BY",
      "label": "NEWARK DTC"
    },
    {
      "value": "561BZ",
      "label": "JAMES J HOWARD OUTPATIENT CLINIC"
    },
    {
      "value": "561GA",
      "label": "HAMILTON CBOC"
    },
    {
      "value": "561GB",
      "label": "ELIZABETH CBOC"
    },
    {
      "value": "561GD",
      "label": "HACKENSACK CBOC"
    },
    {
      "value": "561GE",
      "label": "JERSEY CITY CBOC"
    },
    {
      "value": "561GF",
      "label": "PISCATAWAY CBOC"
    },
    {
      "value": "561GH",
      "label": "MORRIS PLAINS CBOC"
    },
    {
      "value": "561GI",
      "label": "TINTON FALLS CBOC"
    },
    {
      "value": "460HE",
      "label": "ATLANTIC COUNTY VA CLINIC"
    },
    {
      "value": "460HO",
      "label": "SALEM CITY MORC"
    },
    {
      "value": "561GJ",
      "label": "PATERSON CBOC"
    },
    {
      "value": "642GD",
      "label": "GLOUCESTER COUNTY VA CLINIC"
    },
    {
      "value": "561GK",
      "label": "SUSSEX VA CLINIC"
    },
    {
      "value": "642GA",
      "label": "BURLINGTON COUNTY VA CLINIC"
    },
    {
      "value": "460HG",
      "label": "CUMBERLAND COUNTY VA CLINIC"
    },
    {
      "value": "460GD",
      "label": "CAPE MAY (WILMINGTON)"
    },
    {
      "value": "642GF",
      "label": "CAMDEN VA CLINIC"
    },
    {
      "value": "561",
      "label": "NEW JERSEY HEALTH CARE SYSTEM - EAST ORANGE"
    }
  ],
  "DE": [
    {
      "value": "460GA",
      "label": "SUSSEX COUNTY VA CLINIC"
    },
    {
      "value": "460HK",
      "label": "WILMINGTON VA MOBILE CLINIC"
    },
    {
      "value": "460HL",
      "label": "SMYRNA MORC"
    },
    {
      "value": "460GC",
      "label": "KENT COUNTY VA CLINIC"
    },
    {
      "value": "460",
      "label": "WILMINGTON VA MEDICAL CENTER"
    }
  ],
  "MS": [
    {
      "value": "586GA",
      "label": "KOSCIUSKO VA CLINIC"
    },
    {
      "value": "586GB",
      "label": "MERIDIAN"
    },
    {
      "value": "586GC",
      "label": "GREENVILLE"
    },
    {
      "value": "614GA",
      "label": "TUPELO CBOC"
    },
    {
      "value": "614GC",
      "label": "HOLLY SPRINGS VA CLINIC"
    },
    {
      "value": "520A0",
      "label": "GULFPORT VAMC"
    },
    {
      "value": "520BY",
      "label": "BILOXI OPC"
    },
    {
      "value": "586GF",
      "label": "COLUMBUS"
    },
    {
      "value": "586GD",
      "label": "HATTIESBURG"
    },
    {
      "value": "586GE",
      "label": "NATCHEZ"
    },
    {
      "value": "586UMC",
      "label": "UMC"
    },
    {
      "value": "586GG",
      "label": "MCCOMB CBOC"
    },
    {
      "value": "586QB",
      "label": "DOGWOOD VIEW PARKWAY VA CLINIC"
    },
    {
      "value": "586QC",
      "label": "LAKELAND DRIVE VA CLINIC"
    },
    {
      "value": "520",
      "label": "BILOXI VA MEDICAL CENTER"
    },
    {
      "value": "586",
      "label": "G.V. (SONNY) MONTGOMERY"
    }
  ],
  "CA": [
    {
      "value": "640A0",
      "label": "PALO ALTO HEALTH CARE SYSTEM - MENLO PARK DIVSION"
    },
    {
      "value": "640A4",
      "label": "PALO ALTO VAMC-LIVERMORE"
    },
    {
      "value": "640BY",
      "label": "SAN JOSE VA CLINIC"
    },
    {
      "value": "570GA",
      "label": "MERCED VA CLINIC"
    },
    {
      "value": "570GB",
      "label": "TULARE VA CLINIC"
    },
    {
      "value": "612A4",
      "label": "SACRAMENTO VA MEDICAL CENTER"
    },
    {
      "value": "612B4",
      "label": "REDDING VA CLINIC"
    },
    {
      "value": "612BY",
      "label": "OAKLAND VA CLINIC"
    },
    {
      "value": "612GD",
      "label": "FAIRFIELD VA CLINIC"
    },
    {
      "value": "612GE",
      "label": "MARE ISLAND VA CLINIC"
    },
    {
      "value": "612GF",
      "label": "MARTINEZ VA MEDICAL CENTER"
    },
    {
      "value": "612GG",
      "label": "CHICO VA CLINIC"
    },
    {
      "value": "612GH",
      "label": "MCCLELLAN VA CLINIC"
    },
    {
      "value": "605GA",
      "label": "VICTORVILLE CBOC"
    },
    {
      "value": "605GB",
      "label": "MURRIETA CBOC"
    },
    {
      "value": "605GC",
      "label": "PALM DESERT CBOC"
    },
    {
      "value": "605GD",
      "label": "CORONA CBOC"
    },
    {
      "value": "605GE",
      "label": "RANCHO CUCAMONGA CBOC"
    },
    {
      "value": "600GA",
      "label": "ANAHEIM VETERANS HEALTH CLINIC"
    },
    {
      "value": "600GB",
      "label": "SANTA ANA VETERANS HEALTH CLINIC"
    },
    {
      "value": "600GC",
      "label": "CABRILLO VETERANS HEALTH CLINIC"
    },
    {
      "value": "600GD",
      "label": "SANTA FE SPRINGS VA CLINIC"
    },
    {
      "value": "654GA",
      "label": "SIERRA FOOTHILLS VA CLINIC"
    },
    {
      "value": "662GE",
      "label": "SAN BRUNO CBOC"
    },
    {
      "value": "640HC",
      "label": "MONTEREY VA CLINIC"
    },
    {
      "value": "600GE",
      "label": "LAGUNA HILLS VET HLTH CLINIC"
    },
    {
      "value": "662GF",
      "label": "SAN FRANCISCO VA CLINIC"
    },
    {
      "value": "662GA",
      "label": "SANTA ROSA, CA CBOC"
    },
    {
      "value": "662GB",
      "label": "VALLEJO CBOC"
    },
    {
      "value": "662GC",
      "label": "EUREKA VA CLINIC"
    },
    {
      "value": "662GD",
      "label": "UKIAH VA CLINIC"
    },
    {
      "value": "664BY",
      "label": "MISSION VALLEY SOC"
    },
    {
      "value": "664GA",
      "label": "IMPERIAL VALLEY CBOC"
    },
    {
      "value": "664GB",
      "label": "OCEANSIDE CBOC"
    },
    {
      "value": "664GC",
      "label": "CHULA VISTA CBOC"
    },
    {
      "value": "664GD",
      "label": "ESCONDIDO CBOC"
    },
    {
      "value": "640GA",
      "label": "CAPITOLA VA CLINIC"
    },
    {
      "value": "640GB",
      "label": "SONORA VA CLINIC"
    },
    {
      "value": "640HA",
      "label": "PALO ALTO HEALTH CARE SYSTEM - STOCKTON DIVSION"
    },
    {
      "value": "640HB",
      "label": "MODESTO VA CLINIC"
    },
    {
      "value": "691GE",
      "label": "LOS ANGELES CBOC"
    },
    {
      "value": "691GF",
      "label": "EAST LOS ANGELES CBOC"
    },
    {
      "value": "691GG",
      "label": "ANTELOPE VALLEY VA CLINIC"
    },
    {
      "value": "691GK",
      "label": "SAN LUIS OBISPO CBOC"
    },
    {
      "value": "691GL",
      "label": "SANTA MARIA CBOC"
    },
    {
      "value": "691GM",
      "label": "OXNARD CBOC"
    },
    {
      "value": "691GN",
      "label": "LYNWOOD CBOC"
    },
    {
      "value": "691GO",
      "label": "PASADENA CBOC"
    },
    {
      "value": "640GC",
      "label": "FREMONT VA CLINIC"
    },
    {
      "value": "654GD",
      "label": "DIAMOND VIEW VA CLINIC"
    },
    {
      "value": "570GC",
      "label": "OAKHURST VA CLINIC"
    },
    {
      "value": "662GG",
      "label": "CLEARLAKE VA CLINIC"
    },
    {
      "value": "612GI",
      "label": "YUBA CITY CBOC"
    },
    {
      "value": "691A4",
      "label": "SEPULVEDA OUTPATIENT & NURSING HOME CARE"
    },
    {
      "value": "691GB",
      "label": "SANTA BARBARA CBOC"
    },
    {
      "value": "691GC",
      "label": "GARDENA CBOC"
    },
    {
      "value": "691GD",
      "label": "BAKERSFIELD CBOC"
    },
    {
      "value": "612GJ",
      "label": "YREKA VA CLINIC"
    },
    {
      "value": "605BZ",
      "label": "LOMA LINDA VA CLINIC"
    },
    {
      "value": "612QD",
      "label": "HOWE ROAD VA CLINIC"
    },
    {
      "value": "600",
      "label": "VA LONG BEACH HEALTHCARE SYSTEM"
    },
    {
      "value": "605",
      "label": "LOMA LINDA HCS"
    },
    {
      "value": "612",
      "label": "NORTHERN CALIFORNIA HCS"
    },
    {
      "value": "640",
      "label": "PALO ALTO VA MEDICAL CENTER"
    },
    {
      "value": "662",
      "label": "SAN FRANCISCO VAMC"
    },
    {
      "value": "664",
      "label": "VA SAN DIEGO HEALTHCARE SYSTEM (664)"
    },
    {
      "value": "691",
      "label": "VA GREATER LOS ANGELES HEALTHCARE SYSTEM - WEST LOS ANGELES DIVISION"
    },
    {
      "value": "570",
      "label": "FRESNO VA MEDICAL CENTER"
    }
  ],
  "WY": [
    {
      "value": "568HA",
      "label": "NEWCASTLE"
    },
    {
      "value": "666GF",
      "label": "ROCK SPRINGS CBOC"
    },
    {
      "value": "666GB",
      "label": "CASPER CBOC"
    },
    {
      "value": "666GC",
      "label": "RIVERTON VA CLINIC"
    },
    {
      "value": "666GD",
      "label": "CODY VA CLINIC"
    },
    {
      "value": "666GE",
      "label": "GILLETTE VA CLINIC"
    },
    {
      "value": "442MB",
      "label": "IDES SHERIDAN VAMC"
    },
    {
      "value": "442HK",
      "label": "WHEATLAND VA MOBILE CLINIC"
    },
    {
      "value": "666QA",
      "label": "AFTON VA CLINIC"
    },
    {
      "value": "666QB",
      "label": "EVANSTON VA CLINIC"
    },
    {
      "value": "666QC",
      "label": "WORLAND VA CLINIC"
    },
    {
      "value": "666",
      "label": "SHERIDAN VA MEDICAL CENTER"
    },
    {
      "value": "442",
      "label": "CHEYENNE VA MEDICAL"
    }
  ],
  "MA": [
    {
      "value": "518GA",
      "label": "LYNN VA CLINIC"
    },
    {
      "value": "518GB",
      "label": "HAVERHILL VA CLINIC"
    },
    {
      "value": "518GE",
      "label": "GLOUCESTER VA CLINIC"
    },
    {
      "value": "518GG",
      "label": "FITCHBURG CBOC"
    },
    {
      "value": "523A4",
      "label": "VA BOSTON HEALTHCARE SYSTEM - WEST ROXBURY DIVISION"
    },
    {
      "value": "523A5",
      "label": "VA BOSTON HEALTHCARE SYSTEM - BROCKTON DIVISION"
    },
    {
      "value": "523BY",
      "label": "VA BOSTON HEALTHCARE SYSTEM - LOWELL DIVISION"
    },
    {
      "value": "523BZ",
      "label": "VA BOSTON HEALTHCARE SYSTEM - BOSTON OPC DIVISION"
    },
    {
      "value": "523GA",
      "label": "VA BOSTON HEALTHCARE SYSTEM - FRAMINGHAM CBOC"
    },
    {
      "value": "523GB",
      "label": "VA BOSTON HEALTHCARE SYSTEM - WORCESTER DIVISION"
    },
    {
      "value": "523GC",
      "label": "VA BOSTON HEALTHCARE SYSTEM - QUINCY CBOC"
    },
    {
      "value": "523GD",
      "label": "PLYMOUTH CBOC"
    },
    {
      "value": "631BY",
      "label": "SPRINGFIELD OPC"
    },
    {
      "value": "631GC",
      "label": "PITTSFIELD CBOC"
    },
    {
      "value": "631GD",
      "label": "GREENFIELD CBOC"
    },
    {
      "value": "650GA",
      "label": "NEW BEDFORD CBOC"
    },
    {
      "value": "650GB",
      "label": "HYANNIS CBOC"
    },
    {
      "value": "631GE",
      "label": "WORCESTER CBOC"
    },
    {
      "value": "631GF",
      "label": "FITCHBURG CBOC"
    },
    {
      "value": "631QB",
      "label": "LAKE AVENUE VA CLINIC"
    },
    {
      "value": "518",
      "label": "EDITH NOURSE ROGERS VAMC"
    },
    {
      "value": "523",
      "label": "VA BOSTON HEALTHCARE SYSTEM - BOSTON DIVISION"
    },
    {
      "value": "631",
      "label": "VA CNTRL WSTRN MASSCHUSETS HCS"
    }
  ],
  "VA": [
    {
      "value": "613GC",
      "label": "STEPHENS CITY VA CLINIC"
    },
    {
      "value": "613GF",
      "label": "HARRISONBURG VA CLINIC"
    },
    {
      "value": "652GA",
      "label": "FREDERICKSBURG VA CLINIC"
    },
    {
      "value": "621GD",
      "label": "ST CHARLES CBOC"
    },
    {
      "value": "688GA",
      "label": "FORT BELVOIR VA CLINIC"
    },
    {
      "value": "652GE",
      "label": "CHARLOTTESVILLE VA CLINIC"
    },
    {
      "value": "658GA",
      "label": "TAZEWELL VA CLINIC"
    },
    {
      "value": "658GB",
      "label": "DANVILLE VA CLINIC"
    },
    {
      "value": "658GC",
      "label": "LYNCHBURG VA CLINIC"
    },
    {
      "value": "621GJ",
      "label": "BRISTOL VA CLINIC"
    },
    {
      "value": "590GB",
      "label": "VIRGINIA BEACH VA CLINIC"
    },
    {
      "value": "652GF",
      "label": "EMPORIA VA CLINIC"
    },
    {
      "value": "658GE",
      "label": "WYTHEVILLE VA CLINIC"
    },
    {
      "value": "658GD",
      "label": "STAUNTON CBOC"
    },
    {
      "value": "621GC",
      "label": "NORTON VA CLINIC"
    },
    {
      "value": "652GH",
      "label": "HUNTER HOLMES MCGUIRE 2 MOB CL"
    },
    {
      "value": "652GG",
      "label": "RICHMOND VA MOBILE CLINIC"
    },
    {
      "value": "590GD",
      "label": "CHESAPEAKE VA CLINIC"
    },
    {
      "value": "652GB",
      "label": "FREDERICKSBURG 2 VA CLINIC"
    },
    {
      "value": "590",
      "label": "HAMPTON VA MEDICAL CENTER"
    },
    {
      "value": "652",
      "label": "HUNTER HOLMES MCGUIRE HOSPITAL"
    },
    {
      "value": "658",
      "label": "SALEM VA MEDICAL CENTER"
    }
  ],
  "AR": [
    {
      "value": "614GB",
      "label": "JONESBORO VA CLINIC"
    },
    {
      "value": "564GA",
      "label": "HARRISON VA CLINIC"
    },
    {
      "value": "564GB",
      "label": "FORT SMITH VA CLINIC"
    },
    {
      "value": "598GD",
      "label": "MENA, AR (CBOC)"
    },
    {
      "value": "598A0",
      "label": "NORTH LITTLE ROCK, AR VANPH"
    },
    {
      "value": "598GA",
      "label": "MOUNTAIN HOME, AR CBOC"
    },
    {
      "value": "598GB",
      "label": "EL DORADO, AR CBOC"
    },
    {
      "value": "598GC",
      "label": "HOT SPRINGS, AR CBOC"
    },
    {
      "value": "598GE",
      "label": "PINE BLUFF CBOC"
    },
    {
      "value": "598GF",
      "label": "SEARCY CBOC"
    },
    {
      "value": "667GA",
      "label": "TEXARKANA CBOC"
    },
    {
      "value": "614GN",
      "label": "HELENA VA CLINIC"
    },
    {
      "value": "564GD",
      "label": "OZARK CBOC"
    },
    {
      "value": "598GG",
      "label": "CONWAY CBOC"
    },
    {
      "value": "598GH",
      "label": "RUSSELLVILLE CBOC"
    },
    {
      "value": "598",
      "label": "CENTRAL ARKANSAS HEALTH CARE SYSTEM - LITTLE ROCK"
    },
    {
      "value": "564",
      "label": "FAYETTEVILLE VA MEDICAL"
    }
  ],
  "TN": [
    {
      "value": "614GD",
      "label": "SAVANNAH VA CLINIC"
    },
    {
      "value": "621GA",
      "label": "ROGERSVILLE VA CLINIC"
    },
    {
      "value": "626A4",
      "label": "ALVIN C. YORK VAMC"
    },
    {
      "value": "626GA",
      "label": "DOVER VA CLINIC"
    },
    {
      "value": "626GE",
      "label": "CLARKSVILLE VA CLINIC"
    },
    {
      "value": "626GF",
      "label": "CHATTANOOGA VA CLINIC"
    },
    {
      "value": "626GG",
      "label": "TULLAHOMA COMMUNITY BASED OUTPATIENT CLINIC"
    },
    {
      "value": "626GH",
      "label": "COOKEVILLE VA CLINIC"
    },
    {
      "value": "614GF",
      "label": "NONCONNAH BOULEVARD VA CLINIC"
    },
    {
      "value": "614GE",
      "label": "COVINGTON VA CLINIC"
    },
    {
      "value": "621BY",
      "label": "WILLIAM C. TALLENT VA OPC"
    },
    {
      "value": "614GG",
      "label": "JACKSON VA CLINIC"
    },
    {
      "value": "614GH",
      "label": "BOLIVAR CBOC"
    },
    {
      "value": "614GI",
      "label": "DYERSBURG VA CLINIC"
    },
    {
      "value": "621GI",
      "label": "DANNIE A. CARR VETERANS OPC"
    },
    {
      "value": "626GM",
      "label": "MAURY COUNTY CBOC"
    },
    {
      "value": "626GL",
      "label": "ROANE COUNTY VA CLINIC"
    },
    {
      "value": "626GK",
      "label": "MCMINNVILLE VA CLINIC"
    },
    {
      "value": "621GG",
      "label": "MORRISTOWN VA CLINIC"
    },
    {
      "value": "621GK",
      "label": "CAMPBELL COUNTY VA CLINIC"
    },
    {
      "value": "626QC",
      "label": "POINTE CENTRE VA CLINIC"
    },
    {
      "value": "621QE",
      "label": "DOWNTOWN WEST VA CLINIC"
    },
    {
      "value": "626GO",
      "label": "INTERNATIONAL PLAZA VA CLINIC"
    },
    {
      "value": "614",
      "label": "MEMPHIS VA MEDICAL CENTER"
    },
    {
      "value": "621",
      "label": "JAMES H. QUILLEN VAMC"
    },
    {
      "value": "626",
      "label": "TENNESSEE VALLEY HCS"
    }
  ],
  "MO": [
    {
      "value": "564BY",
      "label": "MOUNT VERNON-SOC"
    },
    {
      "value": "657A0",
      "label": "VA HEARTLAND-EAST, VISN 15 HCS JEFFERSON BARRACKS"
    },
    {
      "value": "657A4",
      "label": "JOHN PERSHING VAMC"
    },
    {
      "value": "657GB",
      "label": "ST LOUIS COUNTY VA CLINIC"
    },
    {
      "value": "657GD",
      "label": "ST CHARLES VA CLINIC"
    },
    {
      "value": "589A4",
      "label": "HARRY S. TRUMAN VAMC"
    },
    {
      "value": "589G1",
      "label": "WARRENSBURG MO CBOC"
    },
    {
      "value": "589GB",
      "label": "BELTON VA CLINIC"
    },
    {
      "value": "589GD",
      "label": "NEVADA VA CLINIC"
    },
    {
      "value": "589GZ",
      "label": "CAMERON CBOC"
    },
    {
      "value": "564GC",
      "label": "BRANSON CBOC"
    },
    {
      "value": "589JB",
      "label": "EXCELSIOR SPRINGS CBOC"
    },
    {
      "value": "657GS",
      "label": "WASHINGTON VA CLINIC"
    },
    {
      "value": "589HK",
      "label": "KANSAS CITY MOC"
    },
    {
      "value": "657GX",
      "label": "ST. LOUIS VA CLINIC"
    },
    {
      "value": "657GY",
      "label": "MANCHESTER VA CLINIC"
    },
    {
      "value": "589JF",
      "label": "HONOR VA CLINIC"
    },
    {
      "value": "589",
      "label": "KANSAS CITY VAMC"
    },
    {
      "value": "657",
      "label": "VA HEARTLAND-EAST, VISN 15 HCS JOHN COCHRAN MEMORIAL HOSPITAL"
    }
  ],
  "AL": [
    {
      "value": "520GA",
      "label": "MOBILE OPC"
    },
    {
      "value": "521GA",
      "label": "HUNTSVILLE CBOC"
    },
    {
      "value": "521GB",
      "label": "DECATUR CBOC"
    },
    {
      "value": "521GC",
      "label": "FLORENCE CBOC"
    },
    {
      "value": "521GD",
      "label": "RAINBOW CITY CBOC"
    },
    {
      "value": "521GE",
      "label": "ANNISTON CBOC"
    },
    {
      "value": "521GF",
      "label": "JASPER VA CLINIC"
    },
    {
      "value": "619A4",
      "label": "CENTRAL ALABAMA HEALTH CARE SYSTEM - TUSKEGEE DIVISION"
    },
    {
      "value": "619GB",
      "label": "CENTRAL ALABAMA HCS - DOTHAN CBOC"
    },
    {
      "value": "521GG",
      "label": "BESSEMER CBOC"
    },
    {
      "value": "619GD",
      "label": "WIREGRASS CBOC"
    },
    {
      "value": "521GI",
      "label": "GUNTERSVILLE CBOC"
    },
    {
      "value": "521GH",
      "label": "CHILDERSBURG CBOC"
    },
    {
      "value": "679HK",
      "label": "MOBILE CLINIC TUSCALOOSA"
    },
    {
      "value": "619GE",
      "label": "MONROE COUNTY CBOC"
    },
    {
      "value": "679GA",
      "label": "SELMA VA CLINIC"
    },
    {
      "value": "521GJ",
      "label": "BIRMINGHAM VA CLINIC"
    },
    {
      "value": "521",
      "label": "BIRMINGHAM VAMC"
    },
    {
      "value": "619",
      "label": "CENTRAL ALABAMA HEALTH CARE SYSTEM - MONTGOMERY DIVISION"
    },
    {
      "value": "679",
      "label": "TUSCALOOSA VA MEDICAL CENTER"
    }
  ],
  "OR": [
    {
      "value": "653BY",
      "label": "EUGENE, OR CBOC"
    },
    {
      "value": "653GA",
      "label": "NORTH BEND VA CLINIC"
    },
    {
      "value": "653GB",
      "label": "BROOKINGS VA CLINIC"
    },
    {
      "value": "648GA",
      "label": "BEND, OR CBOC"
    },
    {
      "value": "648GB",
      "label": "SALEM VA CLINIC"
    },
    {
      "value": "648GD",
      "label": "NORTH COAST VA CLINIC"
    },
    {
      "value": "692GA",
      "label": "KLAMATH FALLS VA CLINIC"
    },
    {
      "value": "648GF",
      "label": "HILLSBORO VA CLINIC"
    },
    {
      "value": "692GB",
      "label": "GRANTS PASS CBOC"
    },
    {
      "value": "648GG",
      "label": "WEST LINN CBOC"
    },
    {
      "value": "648GE",
      "label": "EAST PORTLAND VA CLINIC"
    },
    {
      "value": "687GC",
      "label": "LA GRANDE CBOC"
    },
    {
      "value": "648GH",
      "label": "NEWPORT VA CLINIC"
    },
    {
      "value": "531GH",
      "label": "BURNS VA CLINIC"
    },
    {
      "value": "648GI",
      "label": "PORTLAND VA CLINIC"
    },
    {
      "value": "648GJ",
      "label": "LOREN R KAUFMAN VA CLINIC"
    },
    {
      "value": "653QA",
      "label": "DOWNTOWN EUGENE VA CLINIC"
    },
    {
      "value": "648",
      "label": "PORTLAND VA MEDICAL CENTER"
    },
    {
      "value": "653",
      "label": "ROSEBURG VA MEDICAL CENTER"
    },
    {
      "value": "692",
      "label": "WHITE CITY VA MEDICAL CENTER"
    }
  ],
  "OK": [
    {
      "value": "623BY",
      "label": "TULSA, OK CBOC"
    },
    {
      "value": "623GA",
      "label": "MCALESTER VA CLINIC"
    },
    {
      "value": "635GA",
      "label": "LAWTON/FT. SILL VA OUTPATIENT CLINIC"
    },
    {
      "value": "635GC",
      "label": "BLACKWELL CBOC"
    },
    {
      "value": "635GD",
      "label": "ADA CBOC"
    },
    {
      "value": "635HB",
      "label": "ARDMORE VETERANS CENTER CLINIC"
    },
    {
      "value": "564GE",
      "label": "JAY CBOC"
    },
    {
      "value": "623GB",
      "label": "VINITA CBOC"
    },
    {
      "value": "635GE",
      "label": "STILLWATER CBOC"
    },
    {
      "value": "635GF",
      "label": "ALTUS CBOC"
    },
    {
      "value": "635GG",
      "label": "ENID CBOC"
    },
    {
      "value": "635QB",
      "label": "SOUTH OKLAHOMA CITY VA CLINIC"
    },
    {
      "value": "623QC",
      "label": "YALE AVENUE VA CLINIC"
    },
    {
      "value": "635QC",
      "label": "FOURTEENTH STREET VA CLINIC"
    },
    {
      "value": "623",
      "label": "MUSKOGEE, OK VAMC"
    },
    {
      "value": "635",
      "label": "OKLAHOMA CITY VA MEDICAL CENTER"
    }
  ],
  "NV": [
    {
      "value": "654GB",
      "label": "CARSON VALLEY VA CLINIC"
    },
    {
      "value": "593GC",
      "label": "PAHRUMP CBOC"
    },
    {
      "value": "660GC",
      "label": "ELY VA CLINIC"
    },
    {
      "value": "654GC",
      "label": "LAHONTAN VALLEY VA CLINIC"
    },
    {
      "value": "593GD",
      "label": "NORTHWEST PCC"
    },
    {
      "value": "593GE",
      "label": "SOUTHEAST PCC"
    },
    {
      "value": "593GF",
      "label": "SOUTHWEST PCC"
    },
    {
      "value": "593GG",
      "label": "NORTHEAST PCC"
    },
    {
      "value": "654GE",
      "label": "RENO EAST VA CLINIC"
    },
    {
      "value": "593GH",
      "label": "JESSE DEAN VA CLINIC"
    },
    {
      "value": "593QC",
      "label": "WEST CHEYENNE VA CLINIC"
    },
    {
      "value": "654QD",
      "label": "VIRGINIA STREET VA CLINIC"
    },
    {
      "value": "593",
      "label": "SOUTHERN NEVADA HCS"
    },
    {
      "value": "654",
      "label": "IOANNIS A. LOUGARIS VAMC"
    }
  ],
  "KS": [
    {
      "value": "589A5",
      "label": "COLMERY O NEIL VAMC"
    },
    {
      "value": "589A6",
      "label": "DWIGHT D. EISENHOWER VAMC"
    },
    {
      "value": "589A7",
      "label": "ROBERT J. DOLE VAMC"
    },
    {
      "value": "589GC",
      "label": "PAOLA VA CLINIC"
    },
    {
      "value": "589G9",
      "label": "FORT RILEY CBOC"
    },
    {
      "value": "589JC",
      "label": "JOHNSON COUNTY VA CLINIC"
    }
  ],
  "AZ": [
    {
      "value": "644BY",
      "label": "SOUTHEAST CBOC"
    },
    {
      "value": "644GA",
      "label": "SUN CITY, AZ CBOC"
    },
    {
      "value": "644GB",
      "label": "SHOW LOW CBOC"
    },
    {
      "value": "644GC",
      "label": "SOUTHWEST CBOC"
    },
    {
      "value": "644GD",
      "label": "PAYSON CBOC"
    },
    {
      "value": "649GA",
      "label": "KINGMAN CBOC"
    },
    {
      "value": "649GB",
      "label": "FLAGSTAFF CBOC"
    },
    {
      "value": "649GC",
      "label": "PRESCOTT CBOC LAKE HAVASU CITY"
    },
    {
      "value": "649GD",
      "label": "ANTHEM CBOC"
    },
    {
      "value": "649GE",
      "label": "COTTONWOOD CBOC"
    },
    {
      "value": "649HK",
      "label": "PRESCOTT MORC"
    },
    {
      "value": "678GA",
      "label": "SIERRA VISTA CBOC"
    },
    {
      "value": "678GB",
      "label": "YUMA CBOC"
    },
    {
      "value": "678GD",
      "label": "SAFFORD CBOC"
    },
    {
      "value": "678GE",
      "label": "GREEN VALLEY CBOC"
    },
    {
      "value": "644GF",
      "label": "GLOBE HEALTH CARE CLINIC"
    },
    {
      "value": "678GG",
      "label": "SOUTHEAST TUCSON"
    },
    {
      "value": "678GC",
      "label": "CASA GRANDE CBOC"
    },
    {
      "value": "644GE",
      "label": "THUNDERBIRD VA CBOC"
    },
    {
      "value": "678GF",
      "label": "NORTHWEST TUCSON URBAN CBOC"
    },
    {
      "value": "644GG",
      "label": "N EAST PHOENIX VA CLINIC"
    },
    {
      "value": "644GH",
      "label": "PHOENIX MIDTOWN VA CLINIC"
    },
    {
      "value": "678QA",
      "label": "COCHISE COUNTY VA CLINIC"
    },
    {
      "value": "678QB",
      "label": "PINAL COUNTY VA CLINIC"
    },
    {
      "value": "644",
      "label": "PHOENIX VAMC"
    },
    {
      "value": "649",
      "label": "NORTHERN ARIZONA HEALTH CARE SYSTEM - PRESCOTT DIVISION"
    },
    {
      "value": "678",
      "label": "SOUTHERN ARIZONA HEALTH CARE SYSTEM - TUCSON DIVISION"
    }
  ],
  "WA": [
    {
      "value": "648A4",
      "label": "VANCOUVER,WA DIV PORTLAND VAMC"
    },
    {
      "value": "687GA",
      "label": "RICHLAND VA CLINIC"
    },
    {
      "value": "687HA",
      "label": "YAKIMA CBOC"
    },
    {
      "value": "668GA",
      "label": "WENATCHEE VA CLINIC"
    },
    {
      "value": "663HK",
      "label": "PUGET SOUND VA MOBILE CLINIC"
    },
    {
      "value": "668HK",
      "label": "SPOKANE MORC"
    },
    {
      "value": "663A4",
      "label": "PUGET SOUND HEALTH CARE SYSTEM - AMERICAN LAKE DIVISION"
    },
    {
      "value": "663GA",
      "label": "BELLEVUE VA CLINIC"
    },
    {
      "value": "663GB",
      "label": "BREMERTON VA CLINIC"
    },
    {
      "value": "663GD",
      "label": "SOUTH SOUND VA CLINIC"
    },
    {
      "value": "663GC",
      "label": "MOUNT VERNON VA CLINIC"
    },
    {
      "value": "663GE",
      "label": "PORT ANGELES VA CBOC"
    },
    {
      "value": "663",
      "label": "SEATTLE VA MEDICAL CENTER"
    },
    {
      "value": "668",
      "label": "MANN-GRANDSTAFF VAMC"
    },
    {
      "value": "687",
      "label": "JONATHAN M. WAINWRIGHT VAMC"
    }
  ],
  "RI": [
    {
      "value": "650GD",
      "label": "MIDDLETOWN CBOC"
    },
    {
      "value": "650QB",
      "label": "EAGLE STREET VA CLINIC"
    },
    {
      "value": "650",
      "label": "PROVIDENCE VAMC"
    }
  ],
  "DC": [
    {
      "value": "688GB",
      "label": "SOUTHEAST WASHINGTON VA CLINIC"
    },
    {
      "value": "688QA",
      "label": "FRANKLIN STREET VA CLINIC"
    },
    {
      "value": "688",
      "label": "WASHINGTON VA MEDICAL CENTER"
    }
  ],
  "CT": [
    {
      "value": "689A4",
      "label": "NEWINGTON"
    },
    {
      "value": "689GA",
      "label": "WATERBURY"
    },
    {
      "value": "689GB",
      "label": "STAMFORD VA PRIMARY CARE CTR"
    },
    {
      "value": "689GC",
      "label": "WINDHAM CBOC"
    },
    {
      "value": "689GD",
      "label": "WINSTED"
    },
    {
      "value": "689GE",
      "label": "DANBURY"
    },
    {
      "value": "689HC",
      "label": "NEW LONDON"
    },
    {
      "value": "689HK",
      "label": "WEST HAVEN MORC"
    },
    {
      "value": "689",
      "label": "VA CONNECTICUT HEALTHCARE SYSTEM - WEST HAVEN DIVISION"
    }
  ],
  "UT": [
    {
      "value": "660GJ",
      "label": "WESTERN SALT LAKE VA CLINIC"
    },
    {
      "value": "660GB",
      "label": "OGDEN VA CLINIC"
    },
    {
      "value": "660GD",
      "label": "ROOSEVELT VA CLINIC"
    },
    {
      "value": "660GE",
      "label": "OREM VA CLINIC"
    },
    {
      "value": "660GG",
      "label": "ST. GEORGE VA CLINIC"
    },
    {
      "value": "660QC",
      "label": "WEBER COUNTY VA CLINIC"
    },
    {
      "value": "660",
      "label": "GEORGE E. WAHLEN VAMC"
    }
  ],
  "PR": [
    {
      "value": "672B0",
      "label": "PONCE OPC"
    },
    {
      "value": "672BZ",
      "label": "MAYAGUEZ OUTPATIENT CLINIC"
    },
    {
      "value": "672GC",
      "label": "ARECIBO VETERANS CLINIC (CBOC)"
    },
    {
      "value": "672GE",
      "label": "GUAYAMA VA CLINIC"
    },
    {
      "value": "672GD",
      "label": "CEIBA VA CLINIC"
    },
    {
      "value": "672",
      "label": "SAN JUAN VA MEDICAL CENTER"
    }
  ],
  "VI": [
    {
      "value": "672GA",
      "label": "ST.CROIX VETERANS CLINIC"
    },
    {
      "value": "672GB",
      "label": "ST.THOMAS VETERANS CLINIC"
    }
  ],
  "AS": [
    {
      "value": "459GF",
      "label": "FALEOMAVAEGA HUNKIN VA CLINIC"
    }
  ],
  "MP": [
    {
      "value": "459GH",
      "label": "SAIPAN VA CLINIC"
    }
  ],
  "PI": [
    {
      "value": "358",
      "label": "MANILA RO"
    }
  ]
};

const dependentRelationships = [
  'Daughter',
  'Son',
  'Stepson',
  'Stepdaughter',
  'Father',
  'Mother',
  'Spouse',
  'Other'
];

const yesNo = [
  { label: 'Yes', value: 'Y' },
  { label: 'No', value: 'N' }
];

const usaStates = _.map(states.USA, (stateData) => { return stateData.value });

const pciuCountries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Angola",
  "Anguilla",
  "Antigua",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Azores",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Barbuda",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia-Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burma",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo, Democratic Republic of",
  "Congo, People's Republic of",
  "Costa Rica",
  "Cote d'Ivoire",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "England",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Great Britain",
  "Great Britain and Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guatemala",
  "Guinea",
  "Guinea, Republic of Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel (Jerusalem)",
  "Israel (Tel Aviv)",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Leeward Islands",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Mali",
  "Malta",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldavia",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "Nevis",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "Northern Ireland",
  "Norway",
  "Oman",
  "Pakistan",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Philippines (restricted payments)",
  "Poland",
  "Portugal",
  "Qatar",
  "Republic of Yemen",
  "Romania",
  "Russia",
  "Rwanda",
  "Sao-Tome/Principe",
  "Saudi Arabia",
  "Scotland",
  "Senegal",
  "Serbia",
  "Serbia/Montenegro",
  "Seychelles",
  "Sicily",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Somalia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "St. Kitts",
  "St. Lucia",
  "St. Vincent",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey (Adana only)",
  "Turkey (except Adana)",
  "Turkmenistan",
  "USA",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Wales",
  "Western Samoa",
  "Yemen Arab Republic",
  "Zambia",
  "Zimbabwe"
];

// This list represents the states currently available in the `states` PCIU
// endpoint and not available in the current `states` constant.
const statesOnlyInPCIU = [
  { label: "Philippine Islands", value: "PI" },
  { label: "U.S. Minor Outlying Islands", value: "UM" }
];

const pciuStates = states.USA
  .concat(statesOnlyInPCIU)
  .sort((stateA, stateB) => (stateA.label - stateB.label));

const documentTypes526 = [
  { value: 'L015', label: 'Buddy/Lay Statement' },
  { value: 'L018', label: 'Civilian Police Reports' },
  { value: 'L029', label: 'Copy of a DD214' },
  { value: 'L702', label: 'Disability Benefits Questionnaire (DBQ)' },
  { value: 'L703', label: 'Goldmann Perimetry Chart/Field Of Vision Chart' },
  { value: 'L034', label: 'Military Personnel Record' },
  { value: 'L478', label: 'Medical Treatment Records - Furnished by SSA' },
  { value: 'L048', label: 'Medical Treatment Record - Government Facility' },
  { value: 'L049', label: 'Medical Treatment Record - Non-Government Facility' },
  { value: 'L023', label: 'Other Correspondence' },
  { value: 'L070', label: 'Photographs' },
  { value: 'L450', label: 'STR - Dental - Photocopy' },
  { value: 'L451', label: 'STR - Medical - Photocopy' },
  { value: 'L222', label: 'VA Form 21-0779 - Request for Nursing Home Information in Connection with Claim for Aid & Attendance' },
  { value: 'L228', label: 'VA Form 21-0781 - Statement in Support of Claim for PTSD' },
  { value: 'L229', label: 'VA Form 21-0781a - Statement in Support of Claim for PTSD Secondary to Personal Assault' },
  { value: 'L102', label: 'VA Form 21-2680 - Examination for Housebound Status or Permanent Need for Regular Aid & Attendance' },
  { value: 'L107', label: 'VA Form 21-4142 - Authorization To Disclose Information' },
  { value: 'L827', label: 'VA Form 21-4142a - General Release for Medical Provider Information' },
  { value: 'L115', label: 'VA Form 21-4192 - Request for Employment Information in Connection with Claim for Disability' },
  { value: 'L117', label: 'VA Form 21-4502 - Application for Automobile or Other Conveyance and Adaptive Equipment Under 38 U.S.C. 3901-3904' },
  { value: 'L159', label: 'VA Form 26-4555 - Application in Acquiring Specially Adapted Housing or Special Home Adaptation Grant' },
  { value: 'L133', label: 'VA Form 21-674 - Request for Approval of School Attendance' },
  { value: 'L139', label: 'VA Form 21-686c - Declaration of Status of Dependents' },
  { value: 'L149', label: 'VA Form 21-8940 - Veterans Application for Increased Compensation Based on Un-employability' }
];
  
module.exports = {
  countries,
  pciuCountries,
  maritalStatuses,
  branchesServed,
  dischargeTypes,
  states,
  pciuStates,
  salesforceStates,
  salesforceCountries,
  suffixes,
  genders,
  months,
  days,
  vaMedicalFacilities,
  dependentRelationships,
  yesNo,
  usaStates,
  documentTypes526,
  states50AndDC
};
