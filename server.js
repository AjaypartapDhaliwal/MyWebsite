const express = require('express');
const app = express();

const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 2500;

//Middleware
app.use(express.static('webFiles'));
app.use(express.json())

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/webFiles/Contact.html');
})

app.post('/', (req,res)=>{
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ajaypartapdhaliwal@gmail.com',
            pass: 'Sonic15098hotmail'
        }
    });

    const mailOptions = {
        from: req.body.email,
        to: 'ajaypartapdhaliwal@gmail.com',
        subject: `Message from ${req.body.email}`,
        text: req.body.message
    };

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error) {
            console.log(error);
            res.send('error');
        }else{
            console.log('Email sent: ' + info.response);
            res.send('success');
        }
    });
})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})