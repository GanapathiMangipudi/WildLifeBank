var mongoose = require('mongoose');
var imageSchema = new mongoose.Schema({
	name: String,
	lat:String,
	lng:String,
	animal:String,
	img:
	{
		data: Buffer,
		contentType: String
	},
	location: {
		type: {
		  type: String,
		  default: 'Point'
		},
		coordinates: {
		  type: [Number],
		  index: '2dsphere'
		}
	  }
});

module.exports = mongoose.model('Image', imageSchema);
