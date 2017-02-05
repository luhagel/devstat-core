import axios from 'axios'

const mailchimpApiKey = process.env.MAILCHIMP_API_KEY
const mailchimpListId = process.env.MAILCHIMP_LIST_ID
const mailchimpInstance = process.env.MAILCHIMP_INSTANCE

const signUp = (email, name) => {
  let authString = 'Basic ' + new Buffer('any:' + mailchimpApiKey).toString('base64')

  axios.post(`https://${mailchimpInstance}.api.mailchimp.com/3.0/lists/${mailchimpListId}/members/`,
  { email_address: email, status: 'subscribed', merge_fields: { FNAME: name, LNAME: '' } },
  {headers: { Authorization: authString }})
  .then((res) => {
    return null
  })
  .catch((err) => {
    return err
  })
}

export default signUp
