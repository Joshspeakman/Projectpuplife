var bcrypt = require("bcrypt-nodejs");

module.exports = function(Sequelize, DataTypes) {
  
	var User = Sequelize.define('User', {
		id: { 
			autoIncrement: true, 
			primaryKey: true, 
			type: DataTypes.INTEGER
		},
		username: { 
			type: DataTypes.STRING,
			notEmpty: true
        },
        password : {
			type: DataTypes.STRING,
			allowNull: false 
        }, 
        last_login: {
			type: DataTypes.DATE
		}, 
        classMethods: {
            associate: function(models) {
                User.hasMany(models.Dogs);
            }
        }

});

User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
 
  User.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
	return User;

};