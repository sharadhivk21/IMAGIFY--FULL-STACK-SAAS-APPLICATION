import userModel from "../models/userModel.js"
import FormData from 'form-data'
import axios from "axios"


//controller function for generating image from prompt
export const generateImage = async (req, res) => {
    try {
        const { userId, prompt } = req.body
        //the prompt is sent in the body but the userid is sent as a token which is converted to userid using a middleware and then added to the body

        const user = await userModel.findById(userId)

        if (!user || !prompt) {
            return res.json({ success: false, message: 'missing details' })
        }

        if (user.creditBalance === 0 || userModel.creditBalance < 0) {
            return res.json({ success: false, message: 'no credit balance', creditBalance: user.creditBalance })
        }

        //generating images using clipdrop api 
        //https://clipdrop-api.co/text-to-image/v1 - need to hit this url to generate the image. endpoint of our api
        //use post method and promt is required and provide it as a multipart/form-data

        //creating multi form data.
        const formData = new FormData()
        formData.append('prompt', prompt)

        //making the api request using axios
        const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API,
            },
            responseType: 'arraybuffer'
        })

        //response in data is of array buffer, need to convert into base64 for image generation

        const base64Image = Buffer.from(data, 'binary').toString('base64')
        const resultImage = `data:image/png;base64,${base64Image}`

        //deducting user credit (-1)
        await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 })

        res.json({ success: true, message: "image generated", creditBalance: user.creditBalance - 1, resultImage })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}