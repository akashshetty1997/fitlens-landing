// The shape of GET /api/v1/dashboard/platform/ (fitlens-backend core/platform_api.py)

export type Count = { label: string; count: number };

export type TrainerRow = {
  id: number;
  name: string;
  email: string;
  total_clients: number;
  active_clients: number;
  meals_this_period: number;
  avg_compliance: number;
  capacity: number;
  capacity_used: number;
  date_joined: string | null;
};

export type ClientStatus = "at_risk" | "inactive" | "needs_attention" | "on_track";

export type ClientRow = {
  id: number;
  name: string;
  email: string;
  trainer: string;
  days_since_last: number | null;
  meals_today: number;
  meals_this_week: number;
  meals_this_period: number;
  streak: number;
  preferred_method: string;
  last_active: string | null;
  compliance: number;
  status: ClientStatus;
};

export type ProblemReport = {
  id: string;
  created_at: string;
  status: string;
  user: { id: number; name: string; role: string } | null;
  contact_email: string;
  note: string;
  screen: string;
  app_version: string;
  platform: string;
  os_version: string;
  device: string;
  has_screenshot: boolean;
};

export type Dashboard = {
  meta: {
    generated_at: string;
    period_days: number;
    period_options: number[];
    include_demo: boolean;
    demo_accounts: number;
    admin_url: string;
  };
  overview: {
    total_clients: number;
    signups_this_period: number;
    meal_logging_clients_7d: number;
    meal_logging_rate: number;
    total_trainers: number;
    trainers_with_clients: number;
    avg_clients_per_trainer: number;
    meals_this_period: number;
    meals_today: number;
    avg_meals_per_client_day: number;
    ai_meals_total_today: number;
    ai_users_today: number;
  };
  attention: {
    inactive_clients: number;
    plan_full: number;
    unverified_meals: number;
    open_reports: number;
    new_problem_reports: number;
    failed_meals_recent: number;
    pending_meals: number;
  };
  problem_reports: ProblemReport[];
  growth: {
    daily: { day: string; meals: number; signups: number }[];
    meals_total: number;
    signups_total: number;
    signups_today: number;
    signups_this_week: number;
    signups_this_period: number;
    retention_rate: number;
    by_provider: Count[];
    by_role: Count[];
  };
  funnel: { label: string; count: number; percent: number }[];
  plan_leads: (TrainerRow & { plan_state: "over" | "full" | "near" })[];
  plan_near: number;
  trainers: TrainerRow[];
  has_compliance: boolean;
  clients: ClientRow[];
  clients_total: number;
  meals: {
    avg_confidence: number;
    ai_success_rate: number;
    avg_compliance: number;
    avg_response_time: number;
    heavy_ai_users: number;
    compliant_count: number;
    non_compliant_count: number;
    verified_meals: number;
    unverified_meals: number;
    total_meals: number;
    meals_this_period: number;
    peak_hours: string[];
    has_response_time: boolean;
    methods: Count[];
    types: Count[];
    processing: Count[];
    top_ai_users: { id: number; name: string; email: string; role: string; ai_meals_today: number }[];
  };
  community: Record<
    | "squad_posts"
    | "comments"
    | "reactions"
    | "chat_messages"
    | "plans_created"
    | "plans_assigned"
    | "water_logs"
    | "weight_logs",
    number
  >;
  accounts: {
    total_users: number;
    verified_users: number;
    unverified_users: number;
    verified_rate: number;
    verify_codes_24h: number;
    reset_codes_24h: number;
    push_users: number;
    push_rate: number;
    user_blocks: number;
    open_reports: number;
    devices_by_platform: Count[];
    content_reports: { id: string; reason: string; content_type: string; status: string; created_at: string }[];
  };
};
