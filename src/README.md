# Schemas

## HLR Schemas

[Higher-Level Reviews](https://www.va.gov/decision-reviews/higher-level-review/) (HLRs) are one of three types of benefit decision reviews.

```
HLR-CREATE-REQUEST-BODY
HLR-CREATE-REQUEST-HEADERS
HLR-CREATE-RESPONSE-200
HLR-CREATE-RESPONSE-422

HLR-GET-CONTESTABLE-ISSUES-REQUEST-BENEFIT-TYPE
HLR-GET-CONTESTABLE-ISSUES-REQUEST-HEADERS
HLR-GET-CONTESTABLE-ISSUES-RESPONSE-200
HLR-GET-CONTESTABLE-ISSUES-RESPONSE-404
HLR-GET-CONTESTABLE-ISSUES-RESPONSE-422

HLR-SHOW-RESPONSE-200
HLR-SHOW-RESPONSE-404
```

The JSON Schemas listed above are for interacting with HLRs using (ultimately) the [Lighthouse Decision Reviews API](https://developer.va.gov/explore/appeals/docs/decision_reviews?version=current). The Decision Reviews API submits an electronic copy of [Form 20-0996](https://www.vba.va.gov/pubs/forms/VBA-20-0996-ARE.pdf) to Central Mail.

How these schemas match to endpoints:
---
#### _POST_ `higher_level_reviews`

##### Request Schema
```
HLR-CREATE-REQUEST
```

##### Response Schemas

| HTTP Status Code | Schema |
| :-: | :-: |
|200|`HLR-CREATE-RESPONSE-200`|
|422|`HLR-CREATE-RESPONSE-422`|

note: `HLR-CREATE-RESPONSE-200` and `HLR-SHOW-RESPONSE-200` are the same schema

###### Full URL:
```
https://va.gov/v0/higher_level_reviews
https://api.va.gov/services/appeals/v1/decision_reviews/higher_level_reviews
https://staging-api.va.gov/services/appeals/v1/decision_reviews/higher_level_reviews
https://sandbox-api.va.gov/services/appeals/v1/decision_reviews/higher_level_reviews
https://dev-api.va.gov/services/appeals/v1/decision_reviews/higher_level_reviews
```

---
#### _GET_ `higher_level_reviews/{uuid}`

##### Request Schema
_none. the only input is a single UUID_

##### Response Schemas

| HTTP Status Code | Schema |
| :-: | :-: |
|200|`HLR-SHOW-RESPONSE-200`|
|404|`HLR-SHOW-RESPONSE-404`|

note: `HLR-SHOW-RESPONSE-200` and `HLR-CREATE-RESPONSE-200` are the same schema

###### Full URL:
```
https://va.gov/v0/higher_level_reviews/{uuid}
https://api.va.gov/services/appeals/v1/decision_reviews/higher_level_reviews/{uuid}
https://staging-api.va.gov/services/appeals/v1/decision_reviews/higher_level_reviews/{uuid}
https://sandbox-api.va.gov/services/appeals/v1/decision_reviews/higher_level_reviews/{uuid}
https://dev-api.va.gov/services/appeals/v1/decision_reviews/higher_level_reviews/{uuid}
```

---
#### _GET_ `higher_level_reviews/contestable_issues/{benefit_type}`

##### Request Schema
```
HLR-GET-CONTESTABLE-ISSUES-REQUEST
```

##### Response Schemas

| HTTP Status Code | Schema |
| :-: | :-: |
|200|`HLR-GET-CONTESTABLE-ISSUES-RESPONSE-200`|
|404|`HLR-GET-CONTESTABLE-ISSUES-RESPONSE-404`|
|422|`HLR-GET-CONTESTABLE-ISSUES-RESPONSE-422`|

###### Full URL:
```
https://va.gov/v0/higher_level_reviews/contestable_issues/{benefit_type}
https://api.va.gov/services/appeals/v1/decision_reviews/higher_level_reviews/contestable_issues/{benefit_type}
https://staging-api.va.gov/services/appeals/v1/decision_reviews/higher_level_reviews/contestable_issues/{benefit_type}
https://sandbox-api.va.gov/services/appeals/v1/decision_reviews/higher_level_reviews/contestable_issues/{benefit_type}
https://dev-api.va.gov/services/appeals/v1/decision_reviews/higher_level_reviews/contestable_issues/{benefit_type}
```
