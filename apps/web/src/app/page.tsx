"use client";

import { useState } from "react";
import { BookOpen, GitBranch, HomeIcon, Info, Star, User } from "lucide-react";

import { KeepAndroidOpenBanner } from "@/components/KeepAndroidOpen";

import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { Avatar } from "@/components/ui/Avatar";
import { Banner } from "@/components/ui/Banner";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Dialog, DialogCloseButton } from "@/components/ui/Dialog";
import { Dropdown } from "@/components/ui/Dropdown";
import { Input } from "@/components/ui/Input";
import { Lightbox } from "@/components/ui/Lightbox";
import { useGalleryLightbox } from "@/components/ui/UseGalleryLightbox";
import { SearchInput } from "@/components/ui/SearchInput";
import { Section } from "@/components/ui/Section";
import {
  SectionHeader,
  SectionColumnLabel,
} from "@/components/ui/SectionHeader";
import {
  SkeletonCard,
  SkeletonSummaryRow,
  SkeletonRows,
} from "@/components/ui/Skeleton";
import { StatRow } from "@/components/ui/StatRow";
import { TabBar, TabPanel } from "@/components/ui/TabBar";
import { Tag } from "@/components/ui/Tag";
import { Textarea } from "@/components/ui/Textarea";

import { FaGithub, FaInstagram, FaSpotify, FaXTwitter } from "react-icons/fa6";
import { FaLastfm } from "react-icons/fa";

const spotifyAccounts = [
  {
    name: "Artist",
    url: "https://open.spotify.com/artist/4ztedRQMcTeNSIpu5A5STy",
  },
  {
    name: "Personal",
    url: "https://open.spotify.com/user/31f35f5kcsdxh3uvp65xqwno3i5u",
  },
];

const socials = [
  { name: "X", url: "https://twitter.com/theoldzoom", icon: FaXTwitter },
  {
    name: "Instagram",
    url: "https://instagram.com/itsxayv",
    icon: FaInstagram,
  },
  { name: "GitHub", url: "https://github.com/theoldzoom", icon: FaGithub },
  {
    name: "Last.fm",
    url: "https://www.last.fm/user/theoldzoom",
    icon: FaLastfm,
  },
];

const GALLERY_IMAGES = [
  {
    src: "https://picsum.photos/800/600?random=1",
    caption: "Random Image 1",
  },
  {
    src: "https://picsum.photos/800/600?random=2",
    caption: "Random Image 2",
  },
];

export default function Home() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("option1");

  const [searchValue, setSearchValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const [activeTab, setActiveTab] = useState("tab1");

  const gallery = useGalleryLightbox(GALLERY_IMAGES.length);

  const dropdownOptions = [
    { id: "option1", label: "Option 1" },
    { id: "option2", label: "Option 2" },
  ] as const;

  const tabs = [
    { id: "tab1", label: "General" },
    { id: "tab2", label: "Advanced" },
  ] as const;

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 space-y-12 px-6 pb-12">
      {/* Navigation */}
      <Nav
        name="Xavier Zoom Boulanger"
        href="/"
        links={[
          {
            label: "A random guy that enjoys life",
            href: "/randomguy",
            icon: <User className="size-3.5" />,
          },
          { label: "Home", href: "/", icon: <HomeIcon className="size-3.5" /> },
        ]}
      />

      {/* Buttons */}
      <Section
        id="buttons-section"
        label="Interactive Elements"
        description="Standard buttons, toggles, and actionable components used across the app."
      >
        <SectionHeader
          label="Buttons & Toggles"
          sublabel="Test different variants and states"
        />

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="solid">Solid</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="outline" selected>
              Selected Outline
            </Button>
            <Button variant="ghost">Ghost</Button>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Button size="xs">XS Size</Button>
            <Button size="sm">SM Size</Button>
            <Button size="md">MD Size</Button>

            <Button size="icon" aria-label="Icon Button" variant="outline">
              <Star />
            </Button>
          </div>
        </div>
      </Section>

      {/* Inputs */}
      <Section id="inputs-section" label="Form Inputs">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <SectionColumnLabel>Text Inputs</SectionColumnLabel>

            <Input
              placeholder="Standard Input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />

            <Textarea
              placeholder="Standard Textarea"
              rows={3}
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
            />

            <SearchInput
              value={searchValue}
              onChange={setSearchValue}
              placeholder="Search..."
            />
          </div>

          <div className="space-y-4">
            <SectionColumnLabel>Selection</SectionColumnLabel>

            <div className="flex items-center gap-4">
              <Checkbox
                id="test-checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />

              <label htmlFor="test-checkbox" className="text-sm">
                Accept terms and conditions
              </label>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <span className="text-sm">Select an option:</span>

              <Dropdown
                options={dropdownOptions}
                value={dropdownValue as any}
                onChange={(value) => setDropdownValue(value as any)}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Data Display */}
      <Section id="display-section" label="Data Display">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="flex items-center gap-4">
              <Avatar alt="User avatar" fallback="user" size={48} rounded />

              <div>
                <h3 className="font-medium">User Profile</h3>

                <div className="mt-1 flex gap-2">
                  <Tag>Admin</Tag>
                  <Tag>Pro</Tag>
                </div>
              </div>
            </CardContent>

            <CardFooter className="justify-between">
              <span className="text-xs text-muted">Joined 2024</span>

              <Button variant="outline" size="xs">
                Edit
              </Button>
            </CardFooter>
          </Card>

          <div className="space-y-2">
            <StatRow
              label="Total Users"
              value="1,234"
              secondary="Up 12% from last week"
            />

            <StatRow label="Revenue" value="$4,567" />
          </div>
        </div>
      </Section>

      {/* Tabs */}
      <Section id="tabs-section" label="Navigation & Layout">
        <TabBar
          tabs={tabs}
          active={activeTab as any}
          onSelect={(id) => setActiveTab(id as any)}
        />

        <div className="mt-6">
          <TabPanel id="tab1" active={activeTab}>
            <p className="text-sm text-muted">
              This is the general tab content. Switch tabs to see changes.
            </p>
          </TabPanel>

          <TabPanel id="tab2" active={activeTab}>
            <p className="text-sm text-muted">
              Advanced settings would go here.
            </p>
          </TabPanel>
        </div>
      </Section>

      {/* Overlays */}
      <Section id="modals-section" label="Overlays">
        <div className="flex flex-wrap gap-4">
          <Button variant="solid" onClick={() => setDialogOpen(true)}>
            Open Dialog
          </Button>

          <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            ariaLabelledBy="dialog-title"
          >
            <h2 id="dialog-title" className="text-lg font-medium">
              Test Dialog
            </h2>

            <p className="mt-2 text-sm text-muted">
              This is a modal dialog window.
            </p>

            <div className="mt-6 flex justify-end">
              <DialogCloseButton onClick={() => setDialogOpen(false)} />
            </div>
          </Dialog>

          <Button variant="outline" onClick={() => gallery.open(0)}>
            Open Lightbox
          </Button>

          {gallery.isOpen && gallery.openIndex !== null && (
            <Lightbox
              images={GALLERY_IMAGES}
              index={gallery.openIndex}
              onClose={gallery.close}
              onPrev={gallery.showPrev}
              onNext={gallery.showNext}
              touchHandlers={gallery.touchHandlers}
            />
          )}
        </div>
      </Section>

      {/* Loading */}
      <Section id="loading-section" label="Loading States" hideBottomBorder>
        <div className="space-y-6">
          <SkeletonCard />

          <div>
            <SkeletonSummaryRow />
            <SkeletonRows count={2} />
          </div>
        </div>
      </Section>

      <Footer
        name="Xavier Zoom Boulanger"
        email="theoldzoom@proton.me"
        tagline="A Random Guy That Enjoys Life"
        socials={socials}
        linkGroup={{
          triggerIcon: <FaSpotify className="h-6 w-6" />,
          ariaLabel: "Open Spotify accounts",
          links: spotifyAccounts,
        }}
        privacyHref="/privacy"
        termsHref="/terms"
      />
    </main>
  );
}
