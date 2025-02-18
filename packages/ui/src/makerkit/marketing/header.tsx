import { cn } from '../../lib/utils';

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  logo?: React.ReactNode;
  navigation?: React.ReactNode;
  actions?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = function ({
  className,
  logo,
  navigation,
  actions,
  ...props
}) {
  return (
    <div
      className={cn(
        'site-header sticky top-0 z-10 w-full bg-background/80 py-2 backdrop-blur-md dark:bg-background/50',
        className,
      )}
      {...props}
    >
      <div className="container">
        <div className="grid h-14 grid-cols-3 items-center">
          <div className={'mx-auto lg:mx-0'}>{logo}</div>
          <div className="order-first md:order-none">{navigation}</div>
          <div className="flex items-center justify-end space-x-1">
            {actions}
          </div>
        </div>
      </div>
    </div>
  );
};
