export let usersData =  [
	{
		"user": {
			"id": "abacf8f3-570b-45be-85f6-e5ff8db45bac",
			"name": "John Doe",
			"email": "johndoe@example.com"
		},
		"links": {
			"self": "/api/users/5f3b4b29-03dd-4ed9-84a3-6dfcfz4c2be98",
			"hobbies": [
				"dancing",
				"gardening",
				"hiking"
			]
		}
	},
	{
		"user": {
			"id": "8c67d352-21ce-4a10-af27-278fd00ecf93",
			"name": "Test user",
			"email": "kirova@gmail.com"
		},
		"links": {
			"self": "/api/users/5f3b4b29-03dd-4ed9-84a3-6dfcfz4c2be98",
			"hobbies": "/api/users/5f3b4b29-03dd-4ed9-84a3-6dfcfz4c2be98/hobbies"
		}
	},
	{
		"user": {
			"id": "5ba348d6-d32f-43fc-a937-dfe29d9b08c8",
			"name": "Test user-2",
			"email": "kirova@gmail.com"
		},
		"links": {
			"self": "/api/users/5f3b4b29-03dd-4ed9-84a3-6dfcfz4c2be98",
			"hobbies": [
				"/api/users/5f3b4b29-03dd-4ed9-84a3-6dfcfz4c2be98/hobbies",
				"sports"
			]
		}
	},
	{
		"user": {
			"id": "b013b125-1e7b-4737-9537-f4c5e4cc6bae",
			"name": "Test user-3",
			"email": "kirova@gmail.com"
		},
		"links": {
			"self": "/api/users/5f3b4b29-03dd-4ed9-84a3-6dfcfz4c2be98",
			"hobbies": [
				"hiking",
				"dancing",
				"sports",
				"gardening"
			]
		}
	},
	{
		"user": {
			"id": "36fba794-e523-407c-b693-28fb3122cbd9",
			"name": "John Doe - test",
			"email": "johndoe@example.com"
		},
		"links": {
			"self": "/api/users/36fba794-e523-407c-b693-28fb3122cbd9",
			"hobbies": "/api/users/36fba794-e523-407c-b693-28fb3122cbd9/hobbies"
		}
	},
	{
		"user": {
			"id": "75981772-188e-4274-9b06-2af2980f00d6",
			"name": "Test1",
			"email": "johndoe@example.com"
		},
		"links": {
			"self": "/api/users/75981772-188e-4274-9b06-2af2980f00d6",
			"hobbies": "/api/users/75981772-188e-4274-9b06-2af2980f00d6/hobbies"
		}
	},
	{
		"user": {
			"id": "f4dcc119-f8a1-4f43-9a16-1a9d2776abde",
			"name": "Test3",
			"email": "johndoe@example.com"
		},
		"links": {
			"self": "/api/users/f4dcc119-f8a1-4f43-9a16-1a9d2776abde",
			"hobbies": [
				"/api/users/f4dcc119-f8a1-4f43-9a16-1a9d2776abde/hobbies",
				"/api/users/f7cdad23-b8e1-477c-9a16-e48c31936ed7/hobbies",
				"dancing"
			]
		}
	}
]