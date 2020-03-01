const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
const sgMail = require("@sendgrid/mail");

const port = process.env.port || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/client"));
app.use("/", router);

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/index.html"));
});

// Sendgrid config
sgMail.setApiKey(require("./config/keys").sendGridApiKey);

router.post("/sendEmail", async (req, res) => {
  const msg = {
    to: "barbariansgroupsas@gmail.com",
    from: `${req.body.email}`,
    subject: "Email enviado desde la pagina web",
    text: `${req.body.mensaje}`,
    html: `<p>${req.body.mensaje}</p><br/><p>Mensaje enviado por ${req.body.name}</p>`
  };
  sgMail.send(msg);

  return res.status(200).send("Success");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
