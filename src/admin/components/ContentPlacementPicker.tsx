import { useEffect, useMemo, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SERVICE_TAXONOMY, normalizePagePaths } from "../lib/serviceTaxonomy";

interface ContentPlacementPickerProps {
  value?: string[];
  onChange: (paths: string[]) => void;
  contentLabel: string;
}

export default function ContentPlacementPicker({ value = [], onChange, contentLabel }: ContentPlacementPickerProps) {
  const selected = useMemo(() => normalizePagePaths(value), [value]);
  const [verticalPath, setVerticalPath] = useState(() => {
    return SERVICE_TAXONOMY.find((vertical) =>
      selected.some((path) => path === vertical.path || vertical.categories.some((category) =>
        path === category.path || category.children.some((child) => child.path === path))))?.path ?? SERVICE_TAXONOMY[0].path;
  });
  const vertical = SERVICE_TAXONOMY.find((item) => item.path === verticalPath) ?? SERVICE_TAXONOMY[0];

  useEffect(() => {
    if (!SERVICE_TAXONOMY.some((item) => item.path === verticalPath)) setVerticalPath(SERVICE_TAXONOMY[0].path);
  }, [verticalPath]);

  const toggle = (path: string) => {
    onChange(selected.includes(path) ? selected.filter((item) => item !== path) : [...selected, path]);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Service category</Label>
        <Select value={vertical.path} onValueChange={setVerticalPath}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {SERVICE_TAXONOMY.map((item) => <SelectItem key={item.path} value={item.path}>{item.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <label className="flex cursor-pointer items-start gap-3 rounded-md border p-3">
        <Checkbox checked={selected.includes(vertical.path)} onCheckedChange={() => toggle(vertical.path)} />
        <span>
          <span className="block text-sm font-medium">{vertical.label} overview</span>
          <span className="block text-xs text-muted-foreground">Show this {contentLabel} on {vertical.path}</span>
        </span>
      </label>

      <div className="max-h-[28rem] space-y-4 overflow-y-auto pr-1">
        {vertical.categories.map((category) => (
          <div key={category.path} className="rounded-md border p-3">
            <label className="flex cursor-pointer items-start gap-3">
              <Checkbox checked={selected.includes(category.path)} onCheckedChange={() => toggle(category.path)} />
              <span>
                <span className="block text-sm font-medium">{category.label}</span>
                <span className="block text-xs text-muted-foreground">{category.path}</span>
              </span>
            </label>
            {category.children.length > 0 && (
              <div className="mt-3 space-y-2 border-l pl-4">
                {category.children.map((child) => (
                  <label key={child.path} className="flex cursor-pointer items-start gap-2 py-1">
                    <Checkbox checked={selected.includes(child.path)} onCheckedChange={() => toggle(child.path)} />
                    <span>
                      <span className="block text-sm">{child.label}</span>
                      <span className="block break-all text-[11px] text-muted-foreground">{child.path}</span>
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Selected on {selected.length} page{selected.length === 1 ? "" : "s"}. Only checked pages will show this {contentLabel} above their FAQs.
      </p>
    </div>
  );
}
