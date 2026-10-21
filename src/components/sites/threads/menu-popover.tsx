"use client";

import { Menu } from "@base-ui/react/menu";
import { cn } from "@/lib/utils";
import { CheckIcon } from "./extra-icons";
import { MenuIcon } from "./icons";
import { DEMO_NOTICE } from "./messages";
import { setTheme, useTheme, type ThemeName } from "./theme";

interface MenuPopoverProps {
  side?: "right" | "bottom";
  align?: "start" | "end";
  className?: string;
}

const APPEARANCE: ReadonlyArray<{ value: ThemeName; label: string }> = [
  { value: "light", label: "라이트" },
  { value: "dark", label: "다크" },
];

function isThemeName(value: unknown): value is ThemeName {
  return value === "light" || value === "dark";
}

/** "더 보기" menu: appearance (light/dark) plus the unofficial-demo disclaimer. */
export function MenuPopover({ side = "right", align = "end", className }: MenuPopoverProps) {
  const { theme } = useTheme();

  return (
    <Menu.Root modal={false}>
      <Menu.Trigger
        aria-label="더 보기"
        className={cn(
          "flex size-[34px] items-center justify-center rounded-full text-foreground outline-offset-2 transition-colors hover:bg-nav-hover data-[popup-open]:bg-nav-active",
          className,
        )}
      >
        <MenuIcon size={18} aria-hidden="true" />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner side={side} align={align} sideOffset={10} collisionPadding={12} className="z-50 outline-none">
          <Menu.Popup className="w-[240px] origin-[var(--transform-origin)] rounded-[20px] border border-menu-outline bg-surface p-2 text-foreground shadow-[0_8px_40px_rgba(0,0,0,0.16)] outline-none transition-[opacity,transform] duration-150 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
            <Menu.Group>
              <Menu.GroupLabel className="px-3 pt-2 pb-1 text-[13px] font-semibold text-muted-foreground">
                모양
              </Menu.GroupLabel>
              <Menu.RadioGroup
                value={theme}
                onValueChange={(value) => {
                  if (isThemeName(value)) setTheme(value);
                }}
              >
                {APPEARANCE.map((option) => (
                  <Menu.RadioItem
                    key={option.value}
                    value={option.value}
                    closeOnClick
                    className="flex h-[38px] cursor-pointer items-center justify-between rounded-lg px-3 text-[15px] font-semibold outline-none data-[highlighted]:bg-hover"
                  >
                    {option.label}
                    <Menu.RadioItemIndicator>
                      <CheckIcon size={18} />
                    </Menu.RadioItemIndicator>
                  </Menu.RadioItem>
                ))}
              </Menu.RadioGroup>
            </Menu.Group>
            <div role="separator" className="mx-3 my-2 h-px bg-border" />
            <p className="px-3 pt-1 pb-2 text-[13px] leading-[18px] text-muted-foreground">
              {DEMO_NOTICE}
            </p>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
