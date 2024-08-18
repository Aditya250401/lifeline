const createTokenUser = (user) => {
	return {
		userId: user.id,
		email: user.email,
		isAdmin: user.isAdmin,
		isCampManager: user.isCampManager,
	}
}

module.exports = createTokenUser
