// controllers/usuarioController.js
const jwt = require('jsonwebtoken');
const pool = require('../db/connection');
const { Resend } = require('resend');
const resend = new Resend('');

exports.insertarUsuario = (req, res) => {
    const { nombre, apellido, correo, imagen, genero, fecha_nacimento } = req.body;
    pool.query(
        'INSERT INTO USUARIO (nombre, apellido, fecha_nacimiento, genero, email, verificado, imagen) VALUES (?, ?, ?, ?, ?, 0, ?)',
        [nombre, apellido, fecha_nacimento, genero, correo, imagen],
        (err, results) => {
            if (err) {
                console.error('Error en la inserción:', err);
                return res.status(500).json({ error: 'Error en la inserción' });
            }else{
              const userId = results.insertId;
              const token = jwt.sign({ id_usuario: userId }, 'tu_secreto', { expiresIn: '3h' });
              // Envía el token en una cookie y en la respuesta JSON
              res.cookie('sessionToken', token, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === 'production',
                  maxAge: 10800000 // 3 horas
              });
              const formato_correo = `
            <!DOCTYPE html>
              <html>
                <head>
                  <style>
                    body {
                      background-color: #ffffff;
                      font-family: HelveticaNeue, Helvetica, Arial, sans-serif;
                    }
                    .container {
                      background-color: #ffffff;
                      border: 1px solid #eee;
                      border-radius: 5px;
                      box-shadow: 0 5px 10px rgba(20, 50, 70, 0.2);
                      margin-top: 20px;
                      max-width: 360px;
                      margin: 0 auto;
                      padding: 68px 0 130px;
                    }
                    .logo {
                      display: block;
                      margin: 0 auto; /* Centra la imagen */
                      width: auto;
                    }
                    .tertiary {
                      color: #0a85ea;
                      font-size: 11px;
                      font-weight: 700;
                      height: 16px;
                      line-height: 16px;
                      margin: 16px 8px 8px 8px;
                      text-transform: uppercase;
                      text-align: center;
                    }
                    .secondary {
                      color: #000;
                      font-size: 20px;
                      font-weight: 500;
                      line-height: 24px;
                      text-align: center;
                    }
                    .code-container {
                      background: rgba(0, 0, 0, 0.05);
                      border-radius: 4px;
                      margin: 16px auto 14px;
                      width: 280px;
                    }
                    .code {
                      color: #000;
                      font-size: 32px;
                      font-weight: 700;
                      letter-spacing: 6px;
                      line-height: 40px;
                      text-align: center;
                    }
                    .paragraph {
                      color: #444;
                      font-size: 15px;
                      line-height: 23px;
                      margin: 0;
                      text-align: center;
                      padding: 0 40px;
                    }
                    .link {
                      color: #444;
                      text-decoration: underline;
                    }
                    .footer {
                      color: #000;
                      font-size: 12px;
                      font-weight: 800;
                      line-height: 23px;
                      margin-top: 20px;
                      text-transform: uppercase;
                      text-align: center;
                    }
                  </style>
                </head>
                <body>
                  <div class="container">
                    <img
                      src="https://res.cloudinary.com/dtkc1kihy/image/upload/v1732406554/LogoNoP_qchoqw.jpg"
                      width="212"
                      height="88"
                      alt="Logo"
                      class="logo"
                    />
                    <p class="tertiary">Bienvenida</p>
                    <h1 class="secondary">
                      Bienvenido a Nomadas
                    </h1>
                    <div class="code-container">
                      <p class="code"></p>
                    </div>
                    <p class="paragraph">¿No esperabas este correo?</p>
                    <p class="paragraph">
                      Contacta
                      <a href="mailto:Nomadas@nomada.com" class="link">
                        Nomadas@nomada.com
                      </a>
                      si no esperabas esta verificación.
                    </p>
                  </div>
                  <p class="footer">¡El mundo no se va a conquistar solo!</p>
                </body>
              </html>
              `;
              //Funcion envio de correo
              (async function () {
                  const { data, error } = await resend.emails.send({
                      from: 'NomadasApp <onboarding@resend.dev>',
                      to: correo,
                      subject: 'Registro',
                      html: formato_correo,
                  });
                  if (error) {
                      return console.error({ error });
                  }
                  console.log({ data });
              })();
              res.json({ message: 'Usuario registrado y autenticado', id: userId, token });
              console.log({message: results});
            }
        }
    );
};

exports.olvidoUsuario = (req, res) => {
  const { correo } = req.body;
  pool.query(
    'SELECT email FROM USUARIO WHERE email = ?', 
    [correo], 
    (err, results) => {
        if (err) {
            console.error('Error en la consulta de email:', err);
            return res.status(401).json({ error: 'Error en la consulta' });
        }else{
          const formato_correo = `
        <!DOCTYPE html>
            <html>
              <head>
                <style>
                  body {
                    background-color: #ffffff;
                    font-family: HelveticaNeue, Helvetica, Arial, sans-serif;
                  }
                  .container {
                    background-color: #ffffff;
                    border: 1px solid #eee;
                    border-radius: 5px;
                    box-shadow: 0 5px 10px rgba(20, 50, 70, 0.2);
                    margin-top: 20px;
                    max-width: 360px;
                    margin: 0 auto;
                    padding: 68px 0 130px;
                  }
                  .logo {
                    display: block; /* Hace que la imagen sea un bloque */
                    margin-left: auto; /* Centra la imagen a la izquierda */
                    margin-right: auto; /* Centra la imagen a la derecha */
                  }
                  .tertiary {
                    color: #0a85ea;
                    font-size: 11px;
                    font-weight: 700;
                    height: 16px;
                    line-height: 16px;
                    margin: 16px 8px 8px 8px;
                    text-transform: uppercase;
                    text-align: center;
                  }
                  .secondary {
                    color: #000;
                    font-size: 20px;
                    font-weight: 500;
                    line-height: 24px;
                    text-align: center;
                  }
                  .code-container {
                    background: rgba(0, 0, 0, 0.05);
                    border-radius: 4px;
                    margin: 16px auto 14px;
                    width: 280px;
                  }
                  .code {
                    color: #000;
                    font-size: 32px;
                    font-weight: 700;
                    letter-spacing: 6px;
                    line-height: 40px;
                    text-align: center;
                  }
                  .paragraph {
                    color: #444;
                    font-size: 15px;
                    line-height: 23px;
                    margin: 0;
                    text-align: center;
                    padding: 0 40px;
                  }
                  .link {
                    color: #444;
                    text-decoration: underline;
                  }
                  .footer {
                    color: #000;
                    font-size: 12px;
                    font-weight: 800;
                    line-height: 23px;
                    margin-top: 20px;
                    text-transform: uppercase;
                    text-align: center;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <img
                    src="https://res.cloudinary.com/dtkc1kihy/image/upload/v1732406554/LogoNoP_qchoqw.jpg"
                    width="88"
                    height="88"
                    alt="Logo"
                    class="logo"
                  />
                  <p class="tertiary">Restablecer contraseña</p>
                  <h1 class="secondary">
                    Poe favor da click en el boton para restablecer tu contraseña
                  </h1>
                  <div class="code-container">
                    <p class="code"></p>
                  </div>
                  <p class="paragraph">¿No esperabas este correo?</p>
                  <p class="paragraph">
                    Contacta
                    <a href="mailto:Nomadas@nomada.com" class="link">
                      Nomadas@nomada.com
                    </a>
                    si no esperabas este correo.
                  </p>
                </div>
                <p class="footer">¡El mundo no se va a conquistar solo!</p>
              </body>
            </html>`;
          //Funcion envio de correo
          (async function () {
              const { data, error } = await resend.emails.send({
                  from: 'NomadasApp <onboarding@resend.dev>',
                  to: correo,
                  subject: 'Restablecer contraseña',
                  html: formato_correo,
              });
              if (error) {
                  return console.error({ error });
              }
              console.log({ data });
          })();
          
          res.json({ message: 'Restablecer contraseña', results });
        }
    }
);
}
