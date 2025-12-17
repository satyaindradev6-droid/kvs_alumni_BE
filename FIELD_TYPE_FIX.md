# Field Type Fix

## ✅ Fixed tc_year Validation Issue

The validation now accepts both string and number inputs for these fields:
- `tc_year` 
- `state_id`
- `ro_id` 
- `school_id`
- `user_id`

## 📝 Correct Request Body Format

### Student Update (Both formats work now):
```json
{
  "name": "John Updated",
  "mobile_no": "9876543211",
  "email_id": "john@example.com",
  "tc_year": "2021",
  "state_id": "1",
  "school_id": "5"
}
```

OR

```json
{
  "name": "John Updated", 
  "mobile_no": "9876543211",
  "email_id": "john@example.com",
  "tc_year": 2021,
  "state_id": 1,
  "school_id": 5
}
```

## 🚀 Try Again

Your request should work now with either string or number values!