async function commonResponse(req, res, next) {
	res.$success = (data, code = 200) => {
		const _data = {
			code,
		}
		if (typeof data == 'object') {
			_data.msg = 'success'
			_data.data = data
		} else {
			_data.msg = data
		}
		res.json(_data)
	}
	res.$pageSuccess = (data, code = 200) => {
		const _data = {
			code,
		}	
		if (Array.isArray(data)) {
			//针对aggregate出来的数组形数据
			let count = 0
			let returnData = {}
			if (data[0]['count'].length != 0) {
				count = data[0]['count'][0]['count']
				returnData = data[0]['data']
			}
			_data.msg = 'success'
			_data.data = returnData
			_data.count = count
		}	else if(typeof data ==='object'){
			//针对populate出来的对象形数据
			_data.count = data.count;
			_data.data = data.data;
		} else {
			_data.msg = data
		}
		res.json(_data)
	}
	res.$error = (err, code = 500) => {
		const _data = {
			code,
		}
		if (typeof data == 'object') {
			_data.msg = 'error'
			_data.data = JSON.stringify(err)
		} else {
			_data.msg = err
		}
		res.json(_data)
	}
	next()
}

module.exports = {
	commonResponse,
}
