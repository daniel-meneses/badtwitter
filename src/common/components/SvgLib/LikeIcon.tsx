import React from 'react';

import SvgIcon from '../SvgIcon/SvgIcon';

type Props = {
  className?: string;
  onClick?: (event: any) => void;
  fill?: string;
  stroke: string;
};

const LikeIcon = (props: Props) => (
    <SvgIcon viewBox='0 0 23 24' width={'1.6'} {...props}>
      <g>
      <path d='M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12z'/>
      </g>
    </SvgIcon>
)

export default LikeIcon;
