const sendTransaction = async (toAddress: string, amount: number) => {
	const provider = (window as any).solana; // see "Detecting the Provider"

	// const provider = (window as any).solana; // see "Detecting the Provider"
	const network = 'https://api.devnet.solana.com';

	// const provider = getProvider(); // see "Detecting the Provider"
	const message = `To avoid digital dognappers, sign below to authenticate with CryptoCorgis`;
	const encodedMessage = new TextEncoder().encode(message);
	const signedMessage = await provider.signMessage(encodedMessage, 'utf8');
	console.log(signedMessage);
};

export default sendTransaction;
