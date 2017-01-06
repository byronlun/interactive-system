window.addEventListener('load', function  () {
	var loginIn = document.getElementById('loginIn');
	var signIn = document.getElementById('signIn');
	var form = document.getElementById('loginForm');
	var ul = document.getElementsByClassName('switchMenu')[0];
	var sign = document.getElementById('sign');
	var login = document.getElementById('login');

	ul.addEventListener('click', function (event) {
		if (event.target.id == 'quickLogin') {
			console.log('login');
			sign.style.display = 'block';
			login.style.display = 'none';
		} else {
			console.log('sign');
			sign.style.display = 'none';
			login.style.display = 'block';
		}
	});

	signIn.addEventListener('click', function (event) {
		var id = document.getElementById('signInNum').value;
		var password = document.getElementById('signInPassword').value;
		var userType = $("input[type='radio']:checked").val();
		console.log(userType)
		if (id === '' || password === '') {
			console.log('信息填写不完整');
		} else{
			fetch('http://localhost:8008/signin', {
			  method: 'POST',
			  headers: {
			    'Content-Type': 'application/json'
			  },
			  body: JSON.stringify({
			    id: id,
			    password: password,
			    userType: userType
			  })
			}).then(function(response) {
				return response.json()
			}).then(function (json) {
				console.log(json)
				if (json.code == 500) {
					alert(json.msg)
				} else {
					var info = json.info
					if (userType === 'student') {
						sessionStorage.setItem('stuId', info.stuId);
					} else {
						sessionStorage.setItem('teacId', info.teacId);
					}
					sessionStorage.setItem('userType', userType);
					sessionStorage.setItem('password', info.password);
					sessionStorage.setItem('username', info.username);
					sessionStorage.setItem('email', info.email);
					sessionStorage.setItem('sex', info.sex);
					sessionStorage.setItem('age', info.age);
					window.location.href = 'index.html';
				}
			})
		}
	});

	loginIn.addEventListener('click', function (event) {
		var password = document.getElementById('loginInPassword').value;
		var ensurePassword = document.getElementById('ensurePassword').value;
		var input = document.getElementById('loginForm').getElementsByTagName('input');
		var userType = $("input[type='radio']:checked").val();
		for (var i = 0; i < input.length; i++) {
			if (!input[i].value) {
				console.log('信息没填写完整');
				return ;
			}
		}
		if (password !== ensurePassword) {
			console.log('密码输入不一致');
		} else{
			var id = document.getElementById('loginInNum').value;
			var username = document.getElementById('username').value;
			var email = document.getElementById('email').value;
			fetch('http://localhost:8008/loginIn', {
			  method: 'POST',
			  headers: {
			    'Content-Type': 'application/json'
			  },
			  body: JSON.stringify({
			    id: id,
			    password: password,
			    username: username,
			    email: email,
			    userType: userType
			  })
			}).then(function(response) {
				return response.json()
			}).then(function (json) {
				console.log(json)
				if (json.code == 500) {
					alert(json.msg)
				} else {
					var info = json.info
					if (userType === 'student') {
						sessionStorage.setItem('stuId', info.stuId);
					} else {
						sessionStorage.setItem('teacId', info.teacId);
					}
					sessionStorage.setItem('userType', userType);
					sessionStorage.setItem('password', info.password);
					sessionStorage.setItem('username', info.username);
					sessionStorage.setItem('email', info.email);
					sessionStorage.setItem('sex', info.sex);
					sessionStorage.setItem('age', info.age);
					window.location.href = 'index.html';
				}
			})
		}
	});
});