import React from 'react';

import SvgIcon from '../SvgIcon/SvgIcon';

type Props = {
  className?: string;
  onClick?: (event: any) => void;
};

const WebpackLogo = (props: Props) => (
    <SvgIcon viewBox='0 0 800 800' {...props}>
     <path xmlns="http://www.w3.org/2000/svg" d="m387 0 387 218.9v437.9l-387 218.9-387-218.9v-437.9z" fill="#fff"/>
     <path xmlns="http://www.w3.org/2000/svg" d="m704.9 641.7-305.1 172.6v-134.4l190.1-104.6zm20.9-18.9v-360.9l-111.6 64.5v232zm-657.9 18.9 305.1 172.6v-134.4l-190.2-104.6zm-20.9-18.9v-360.9l111.6 64.5v232zm13.1-384.3 312.9-177v129.9l-200.5 110.3-1.6.9zm652.6 0-312.9-177v129.9l200.5 110.2 1.6.9z" fill="#8ed6fb"/>
     <path xmlns="http://www.w3.org/2000/svg" d="m373 649.3-187.6-103.2v-204.3l187.6 108.3zm26.8 0 187.6-103.1v-204.4l-187.6 108.3zm-201.7-331.1 188.3-103.5 188.3 103.5-188.3 108.7z" fill="#1c78c0"/>
    </SvgIcon>
)

export default WebpackLogo;
