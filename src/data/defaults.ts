import { BuriedTab } from '../types';

export const CAUSES_OF_DEATH = [
  "I swear I was gonna read this over the weekend",
  "Opened at 2:47 AM during a Wikipedia spiral",
  "47-page PDF I downloaded with sheer ambition",
  "Tutorial for a framework I will never touch again",
  "Article saved so I can feel cultured without reading it",
  "Tab hoarded through 4 browser updates and 2 crashes",
  "Items left in cart so the algorithm remembers my desires",
  "Documentation I stared at blankly for 12 seconds",
  "Bookmarked for when I suddenly become a morning person",
  "Too long, didn't read (and never will)",
  "Found via hacker news thread, doomed to obscurity"
];

export const INITIAL_BURIED_TABS: BuriedTab[] = [
  {
    id: 'tab-1',
    title: 'A Gentle Guide to Asynchronous Rust in 2024',
    url: 'https://rust-lang.org/learn',
    note: 'Saved because I thought I would suddenly learn low-level concurrency on a Sunday afternoon.',
    causeOfDeath: "I swear I was gonna read this over the weekend",
    burialDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 74).toISOString(), // 74 days ago
    graveStyle: 'gothic',
    flowersCount: 4,
    candleLit: true,
    category: 'tech'
  },
  {
    id: 'tab-2',
    title: 'The Fall of Constantinople: A 14-Part Deep Dive',
    url: 'https://en.wikipedia.org/wiki/Fall_of_Constantinople',
    note: 'Opened while I was supposed to be preparing my annual tax return.',
    causeOfDeath: 'Opened at 2:47 AM during a Wikipedia spiral',
    burialDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 38).toISOString(), // 38 days ago
    graveStyle: 'obelisk',
    flowersCount: 1,
    candleLit: false,
    category: 'rabbit_hole'
  },
  {
    id: 'tab-3',
    title: 'How to Fix Your Circadian Rhythm in 7 Unforgiving Days',
    url: 'https://sleepfoundation.org/circadian-rhythm',
    note: 'Read 2 paragraphs at 3:15 AM while holding a cold cup of coffee.',
    causeOfDeath: 'Bookmarked for when I suddenly become a morning person',
    burialDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 19).toISOString(), // 19 days ago
    graveStyle: 'classic',
    flowersCount: 6,
    candleLit: true,
    category: 'reading'
  },
  {
    id: 'tab-4',
    title: 'Ergonomic Standing Desk Mat with Acupressure Nodes',
    url: 'https://amazon.com/dp/B08XYZ123',
    note: 'Kept in tab limbo for weeks instead of just pressing Buy or Close.',
    causeOfDeath: 'Items left in cart so the algorithm remembers my desires',
    burialDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    graveStyle: 'weathered',
    flowersCount: 0,
    candleLit: false,
    category: 'shopping'
  },
  {
    id: 'tab-5',
    title: 'Architecting Scalable Microservices with Event Sourcing',
    url: 'https://martinfowler.com/articles/event-sourcing.html',
    note: 'I will definitely understand Kafka partitions if I stare at this tab long enough.',
    causeOfDeath: 'Documentation I stared at blankly for 12 seconds',
    burialDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    graveStyle: 'cross',
    flowersCount: 2,
    candleLit: true,
    category: 'tech'
  }
];
