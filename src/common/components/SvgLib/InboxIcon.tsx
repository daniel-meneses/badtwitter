import React from 'react';

import SvgIcon from '../SvgIcon/SvgIcon';

type Props = {
  className?: string;
  isSelected?: boolean;
};

const InboxIcon = (props: Props) => {

  const { isSelected } = props

  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      { isSelected ?
        <g>
          <path d={'M11.55 12.082c.273.182.627.182.9 0L22 5.716V5.5c0-1.24-1.01-2.25-2.25-2.25H4.25C3.01 3.25 2 4.26 2 5.5v.197l9.55 6.385z'}>
          </path>
          <path d={'M13.26 13.295c-.383.255-.82.382-1.26.382s-.877-.127-1.26-.383L2 7.452v11.67c0 1.24 1.01 2.25 2.25 2.25h15.5c1.24 0 2.25-1.01 2.25-2.25V7.47l-8.74 5.823z'}>
          </path>
        </g>
        :
        <g>
          <path d={'M19.25 3.018H4.75C3.233 3.018 2 4.252 2 5.77v12.495c0 1.518 1.233 2.753 2.75 2.753h14.5c1.517 0 2.75-1.235 2.75-2.753V5.77c0-1.518-1.233-2.752-2.75-2.752zm-14.5 1.5h14.5c.69 0 1.25.56 1.25 1.25v.714l-8.05 5.367c-.273.18-.626.182-.9-.002L3.5 6.482v-.714c0-.69.56-1.25 1.25-1.25zm14.5 14.998H4.75c-.69 0-1.25-.56-1.25-1.25V8.24l7.24 4.83c.383.256.822.384 1.26.384.44 0 .877-.128 1.26-.383l7.24-4.83v10.022c0 .69-.56 1.25-1.25 1.25z'}>
          </path>
        </g>
      }
    </SvgIcon>
  )
}

export default InboxIcon;
