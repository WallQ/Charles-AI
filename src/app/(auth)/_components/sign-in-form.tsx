'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { APP_ROUTES } from '@/routes/app';
import * as Clerk from '@clerk/elements/common';
import * as SignIn from '@clerk/elements/sign-in';
import { LoaderCircle } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icons';

const SignInForm: React.FunctionComponent = (): React.ReactNode => {
	return (
		<div className='grid w-full grow items-center px-4 sm:justify-center'>
			<SignIn.Root>
				<Clerk.Loading>
					{(isGlobalLoading) => (
						<Fragment>
							<SignIn.Step name='start'>
								<Card>
									<CardHeader>
										<CardTitle>
											Sign in to Charles-AI
										</CardTitle>
										<CardDescription>
											Welcome back! Please fill in the
											credentials below to continue.
										</CardDescription>
									</CardHeader>
									<CardContent className='grid gap-y-4'>
										<div className='grid grid-cols-3 gap-x-4'>
											<Clerk.Connection
												name='discord'
												asChild>
												<Button
													size='sm'
													variant='outline'
													type='button'
													disabled={isGlobalLoading}>
													<Clerk.Loading scope='provider:discord'>
														{(isLoading) =>
															isLoading ? (
																<LoaderCircle className='size-4 animate-spin' />
															) : (
																<Fragment>
																	<Icons.discord className='mr-2 size-4' />
																	Discord
																</Fragment>
															)
														}
													</Clerk.Loading>
												</Button>
											</Clerk.Connection>
											<Clerk.Connection
												name='github'
												asChild>
												<Button
													size='sm'
													variant='outline'
													type='button'
													disabled={isGlobalLoading}>
													<Clerk.Loading scope='provider:github'>
														{(isLoading) =>
															isLoading ? (
																<LoaderCircle className='size-4 animate-spin' />
															) : (
																<Fragment>
																	<Icons.gitHub className='mr-2 size-4' />
																	GitHub
																</Fragment>
															)
														}
													</Clerk.Loading>
												</Button>
											</Clerk.Connection>
											<Clerk.Connection
												name='google'
												asChild>
												<Button
													size='sm'
													variant='outline'
													type='button'
													disabled={isGlobalLoading}>
													<Clerk.Loading scope='provider:google'>
														{(isLoading) =>
															isLoading ? (
																<LoaderCircle className='size-4 animate-spin' />
															) : (
																<Fragment>
																	<Icons.google className='mr-2 size-4' />
																	Google
																</Fragment>
															)
														}
													</Clerk.Loading>
												</Button>
											</Clerk.Connection>
										</div>
										<p className='flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border'>
											or
										</p>
										<Clerk.Field
											name='identifier'
											className='gap-y-2'>
											<Clerk.Label asChild>
												<Label>Email address</Label>
											</Clerk.Label>
											<Clerk.Input
												type='email'
												required
												asChild
												autoComplete='email'>
												<Input />
											</Clerk.Input>
											<Clerk.FieldError className='block text-sm text-destructive' />
										</Clerk.Field>
									</CardContent>
									<CardFooter>
										<div className='grid w-full gap-y-4'>
											<SignIn.Action submit asChild>
												<Button
													disabled={isGlobalLoading}>
													<Clerk.Loading>
														{(isLoading) => {
															return isLoading ? (
																<LoaderCircle className='size-4 animate-spin' />
															) : (
																'Continue'
															);
														}}
													</Clerk.Loading>
												</Button>
											</SignIn.Action>
											<Button
												variant='link'
												size='sm'
												asChild>
												<Link
													href={
														APP_ROUTES.AUTH.SIGN_UP
													}>
													Don&apos;t have an account?
													Sign up
												</Link>
											</Button>
										</div>
									</CardFooter>
								</Card>
							</SignIn.Step>
							<SignIn.Step name='choose-strategy'>
								<Card>
									<CardHeader>
										<CardTitle>
											Use another method
										</CardTitle>
										<CardDescription>
											Facing issues? You can use any of
											these methods to sign in.
										</CardDescription>
									</CardHeader>
									<CardContent className='grid gap-y-4'>
										<SignIn.SupportedStrategy
											name='email_code'
											asChild>
											<Button
												type='button'
												variant='link'
												disabled={isGlobalLoading}>
												Email code
											</Button>
										</SignIn.SupportedStrategy>
										<SignIn.SupportedStrategy
											name='password'
											asChild>
											<Button
												type='button'
												variant='link'
												disabled={isGlobalLoading}>
												Password
											</Button>
										</SignIn.SupportedStrategy>
									</CardContent>
									<CardFooter>
										<div className='grid w-full gap-y-4'>
											<SignIn.Action
												navigate='previous'
												asChild>
												<Button
													disabled={isGlobalLoading}>
													<Clerk.Loading>
														{(isLoading) => {
															return isLoading ? (
																<LoaderCircle className='size-4 animate-spin' />
															) : (
																'Go back'
															);
														}}
													</Clerk.Loading>
												</Button>
											</SignIn.Action>
										</div>
									</CardFooter>
								</Card>
							</SignIn.Step>
							<SignIn.Step name='verifications'>
								<SignIn.Strategy name='password'>
									<Card>
										<CardHeader>
											<CardTitle>
												Enter your password
											</CardTitle>
											<CardDescription>
												You&apos;re almost there! Enter
												your password to continue.
											</CardDescription>
										</CardHeader>
										<CardContent className='grid gap-y-4'>
											<Clerk.Field
												name='password'
												className='gap-y-2'>
												<Clerk.Label asChild>
													<Label>Password</Label>
												</Clerk.Label>
												<Clerk.Input
													type='password'
													asChild
													validatePassword
													autoComplete='current-password'>
													<Input />
												</Clerk.Input>
												<Clerk.FieldError className='block text-sm text-destructive' />
											</Clerk.Field>
										</CardContent>
										<CardFooter>
											<div className='grid w-full gap-y-4'>
												<SignIn.Action submit asChild>
													<Button
														disabled={
															isGlobalLoading
														}>
														<Clerk.Loading>
															{(isLoading) => {
																return isLoading ? (
																	<LoaderCircle className='size-4 animate-spin' />
																) : (
																	'Continue'
																);
															}}
														</Clerk.Loading>
													</Button>
												</SignIn.Action>
												<SignIn.Action
													navigate='choose-strategy'
													asChild>
													<Button
														type='button'
														size='sm'
														variant='link'>
														Use another method
													</Button>
												</SignIn.Action>
											</div>
										</CardFooter>
									</Card>
								</SignIn.Strategy>
								<SignIn.Strategy name='email_code'>
									<Card>
										<CardHeader>
											<CardTitle>
												Verify your email
											</CardTitle>
											<CardDescription>
												Please enter below the
												verification code we&apos;ve
												sent to your email.
											</CardDescription>
										</CardHeader>
										<CardContent className='grid gap-y-4'>
											<div className='grid items-center justify-center gap-y-2'>
												<Clerk.Field
													name='code'
													className='gap-y-2'>
													<Clerk.Label className='sr-only'>
														Email verification code
													</Clerk.Label>
													<div className='flex justify-center text-center'>
														<Clerk.Input
															type='otp'
															className='flex justify-center has-[:disabled]:opacity-50'
															autoSubmit
															autoComplete='one-time-code'
															render={({
																value,
																status,
															}) => {
																return (
																	<div
																		data-status={
																			status
																		}
																		className={cn(
																			'relative flex size-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md',
																			{
																				'z-10 ring-2 ring-ring ring-offset-background':
																					status ===
																						'cursor' ||
																					status ===
																						'selected',
																			},
																		)}>
																		{value}
																		{status ===
																			'cursor' && (
																			<div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
																				<div className='h-4 w-px animate-caret-blink bg-foreground duration-1000' />
																			</div>
																		)}
																	</div>
																);
															}}
														/>
													</div>
													<Clerk.FieldError className='block text-center text-sm text-destructive' />
													<SignIn.Action
														asChild
														resend
														className='text-muted-foreground'
														fallback={({
															resendableAfter,
														}) => (
															<Button
																variant='link'
																size='sm'
																disabled>
																Didn&apos;t
																recieve a code?
																Resend (
																<span className='tabular-nums'>
																	{
																		resendableAfter
																	}
																</span>
																)
															</Button>
														)}>
														<Button
															variant='link'
															size='sm'>
															Didn&apos;t recieve
															a code? Resend
														</Button>
													</SignIn.Action>
												</Clerk.Field>
											</div>
										</CardContent>
										<CardFooter>
											<div className='grid w-full gap-y-4'>
												<SignIn.Action submit asChild>
													<Button
														disabled={
															isGlobalLoading
														}>
														<Clerk.Loading>
															{(isLoading) => {
																return isLoading ? (
																	<LoaderCircle className='size-4 animate-spin' />
																) : (
																	'Continue'
																);
															}}
														</Clerk.Loading>
													</Button>
												</SignIn.Action>
												<SignIn.Action
													navigate='choose-strategy'
													asChild>
													<Button
														size='sm'
														variant='link'>
														Use another method
													</Button>
												</SignIn.Action>
											</div>
										</CardFooter>
									</Card>
								</SignIn.Strategy>
							</SignIn.Step>
						</Fragment>
					)}
				</Clerk.Loading>
			</SignIn.Root>
		</div>
	);
};

export default SignInForm;
