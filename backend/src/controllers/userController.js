const userLogin = async (req, res) => {

  try {

    const {

      username,

      password

    }

    = req.body;

    if (

      username === "user"

      &&

      password === "user123"

    ) {

      return res.status(200).json({

        message:

          "Login successful"

      });

    }

    res.status(401).json({

      message:

        "Invalid credentials"

    });

  }

  catch (error) {

    res.status(500).json({

      message:

        error.message

    });

  }

};

module.exports = {

  userLogin

};