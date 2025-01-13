"use client";

import Link from "next/link";
import React from "react";
import { DistributiveOmit } from "~/types";

export function AppLink(
  props: DistributiveOmit<React.ComponentProps<typeof Link>, "onClick">,
) {
  return <Link {...props} onClick={(e) => e.preventDefault()} />;
}
