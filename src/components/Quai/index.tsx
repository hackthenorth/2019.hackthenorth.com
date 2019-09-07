import * as React from "react";
import styled from "styled-components";
import { UAParser } from "ua-parser-js";

export interface QuaiProps {
  templateUrl: string;
  unknown?: string;
}

const QuaiLink = styled.a`
  width: 50px;
  height: 50px;
  position: fixed;
  bottom: 15px;
  right: 15px;
  background-color: red;
  border-radius: 999px;
`;

const Quai: React.FC<QuaiProps> = ({ templateUrl, unknown = "<unknown>" }) => {
  const userAgent = new UAParser();
  const { name: browserName, version: browserVersion } = userAgent.getBrowser();
  const {
    model: deviceModel,
    type: deviceType,
    vendor: deviceVendor
  } = userAgent.getDevice();
  const { name: engineName, version: engineVersion } = userAgent.getEngine();
  const { name: osName, version: osVersion } = userAgent.getOS();
  const { architecture } = userAgent.getCPU();
  const { href: url, pathname, origin } = window.location;

  const href = templateUrl
    .replace(/BROWSER_NAME/, browserName || unknown)
    .replace(/BROWSER_VERSION/, browserVersion || unknown)
    .replace(/DEVICE_MODEL/, deviceModel || unknown)
    .replace(/DEVICE_TYPE/, deviceType || unknown)
    .replace(/DEVICE_VENDOR/, deviceVendor || unknown)
    .replace(/ENGINE_NAME/, engineName || unknown)
    .replace(/ENGINE_VERSION/, engineVersion || unknown)
    .replace(/OS_NAME/, osName || unknown)
    .replace(/OS_VERSION/, osVersion || unknown)
    .replace(/ARCHITECTURE/, architecture || unknown)
    .replace(/URL/, url || unknown)
    .replace(/PATH/, pathname || unknown)
    .replace(/ORIGIN/, origin || unknown);

  return <QuaiLink href={href} target="_blank" rel="noopener noreferrer" />;
};

export default React.memo(Quai);
