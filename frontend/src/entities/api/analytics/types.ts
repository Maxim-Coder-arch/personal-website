export type DateRange = {
  from: string;
  to: string;
};

export type Interval = "hour" | "day" | "week" | "month" | "year";

export type SummaryMetrics = {
  visitors: number;
  newVisitors: number;
  returningVisitors: number;
  sessions: number;
  pageViews: number;
  pageViewsPerSession: number;
  avgSessionSeconds: number;
  bounceRate: number;
};

export type SummaryResponse = {
  from: string;
  to: string;
  timeZone: string;
  current: SummaryMetrics;
  previous: SummaryMetrics;
};

export type TimeseriesPoint = {
  start: string;
  label: string;
  visitors: number;
  newVisitors: number;
  returningVisitors: number;
  sessions: number;
  pageViews: number;
  avgSessionSeconds: number;
};

export type TimeseriesResponse = {
  interval: Interval;
  timeZone: string;
  points: TimeseriesPoint[];
};

export type BreakdownItem = {
  key: string;
  sessions: number;
  visitors: number;
  share: number;
  code?: string | null;
};

export type PageStat = {
  path: string;
  views: number;
  sessions: number;
  avgSeconds: number;
};

export type RealtimeResponse = {
  activeVisitors: number;
  pages: { path: string; visitors: number }[];
};

export type BreakdownKey =
  | "country"
  | "region"
  | "device"
  | "browser"
  | "os"
  | "screen"
  | "language"
  | "referrer"
  | "entry"
  | "hour"
  | "weekday";

export type SessionListItem = {
    id: string;
    visitorId: string;
    startedAt: string;
    sessionNumber: number;
    isReturning: boolean;
    pageViewsCount: number;
    durationSeconds: number;
    entryPath: string;
    country: string | null;
    countryCode: string | null;
    region: string | null;
    deviceType: string;
    deviceBrand: string | null;
    deviceModel: string | null;
    browser: string;
    browserVersion: string | null;
    os: string;
    osVersion: string | null;
    screenWidth: number | null;
    screenHeight: number | null;
    viewportWidth: number | null;
    viewportHeight: number | null;
    pixelRatio: number | null;
    language: string | null;
    timeZone: string | null;
    referrerHost: string | null;
    utmSource: string | null;
};

export type SessionListResponse = {
    total: number;
    page: number;
    pageSize: number;
    items: SessionListItem[];
};

export type SessionPageView = {
    path: string;
    viewedAt: string;
    durationSeconds: number;
};

export type SessionDetailResponse = {
    session: SessionListItem;
    pageViews: SessionPageView[];
};

export type SessionFilters = {
    device?: string;
    country?: string;
    returning?: boolean;
};

export type SessionsQuery = {
    range: DateRange;
    filters: SessionFilters;
    page: number;
    pageSize: number;
};