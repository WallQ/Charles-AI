import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export const typographyVariants = cva('text-xl', {
	variants: {
		variant: {
			h1: 'md:text-5xl text-3xl font-extrabold tracking-tight',
			h2: 'md:text-3xl text-2xl font-semibold tracking-tight',
			h3: 'text-2xl font-semibold tracking-tight',
			h4: 'text-xl font-semibold tracking-tight',
			h5: 'text-lg font-medium tracking-tight',
			p: 'text-pretty text-base leading-7 text-muted-foreground',
		},
	},
	defaultVariants: {
		variant: 'p',
	},
});

export interface TypographyProps
	extends React.HTMLAttributes<HTMLHeadingElement>,
		VariantProps<typeof typographyVariants> {}

const Typography = forwardRef<HTMLHeadingElement, TypographyProps>(
	({ className, variant, ...props }, ref) => {
		const Comp = variant ?? 'p';
		return (
			<Comp
				ref={ref}
				{...props}
				className={cn(typographyVariants({ variant }), className)}
			/>
		);
	},
);
Typography.displayName = 'Typography';

export default Typography;
