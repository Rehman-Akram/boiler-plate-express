const sequelize = require('../../../../database/index.js');

const getRoles = (req,res)=>{
  try {
    return sequelize.models.roles.findAll({
      include: [
        {
        model: sequelize.models.permissions,
      }
      ]
    });
  }
  catch(error){
    console.error(`Error in getRoles of roles service`,error)
      res.status(500).json({ statusCode: 500, error: "Internal Server Error" });
      return
  }
}

module.exports = { getRoles }