export const assertEnv = (env: string) => {
	const envValue = process.env[env];

	if (!envValue) {
		throw new Error(`Environment variable missing: ${env}`);
	}

	return envValue;
};