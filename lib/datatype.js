module.exports = {
	string: function(v) {
		if (v == null)
			return '';
		else
			return String(v);
	},
	int: function(v) {
		v = Number(v);
		if (isNaN(v)) v = 0;
		return Math.round(v);
	},
	number: function(v) {
		v = Number(v);
		if (isNaN(v)) v = 0;
		return v;
	},
	bool: function(v) {
		if (!v) return false;
		v = String(v);
		v = v.trim().toLowerCase();
		if (v == '' || v == 'no' || v == 'false') {
			return false;
		} else {
			return true;
		}
	},
	json: function(v) {
		var result = null;
		try {
			result = JSON.parse(v);
		} catch (e) {

		}
		return result;
	}
}