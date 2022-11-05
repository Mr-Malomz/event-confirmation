import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
	const [value, setValue] = useState({
		name: '',
		email: '',
	});
	const [isLoading, setIsloading] = useState(false);

	const handleChange = (e) => {
		setValue({ ...value, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		setIsloading(true);
		e.preventDefault();
		const body = {
			name: value.name,
			email: value.email,
		};

		fetch('./.netlify/functions/saveandconfirm', {
			method: 'POST',
			body: JSON.stringify(body),
		}).then((_) => {
			alert('Confirmed successfully!');
			setValue({ ...value, name: '', email: '' });
			setIsloading(false);
		});
	};
	return (
		<div>
			<Head>
				<title>Event confirmation</title>
				<meta
					name='description'
					content='Generated by create next app'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className='py-4 px-4 lg:py-10 lg:px-10 w-full'>
				<section className='flex justify-center'>
					<div className='px-4 py-2 border rounded-lg w-full lg:w-2/4'>
						<div className='border-b h-8 mb-4'>
							<h3 className='text-gray-700'>
								Confirm Attendance
							</h3>
						</div>
						<form onSubmit={handleSubmit}>
							<fieldset>
								<label className='text-sm text-gray-400 mb-4 block'>
									Name
								</label>
								<input
									name='name'
									className='border w-full rounded-sm mb-6 p-2'
									required
									value={value.name}
									onChange={handleChange}
								/>
							</fieldset>
							<fieldset>
								<label className='text-sm text-gray-400 mb-4 block'>
									Email
								</label>
								<input
									name='email'
									className='border w-full rounded-sm mb-6 p-2'
									type='email'
									required
									value={value.email}
									onChange={handleChange}
								/>
							</fieldset>
							<button
								className='text-sm text-white px-8 py-2 rounded-sm bg-teal-600 hover:bg-teal-700'
								disabled={isLoading}
							>
								Submit
							</button>
						</form>
					</div>
				</section>
			</main>
		</div>
	);
}
