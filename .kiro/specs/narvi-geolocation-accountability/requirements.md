# Requirements Document

## Introduction

Narby is a geolocation-based accountability app that helps users align their daily activities with their personal goals through AI-powered location categorization and gamified point systems. The app allows users to define their personal objectives during onboarding, then continuously evaluates nearby locations and businesses to assign point values based on goal alignment. The app operates in both passive tracking and proactive notification modes, providing users with real-time feedback and daily summaries of their goal-aligned activities.

## Requirements

### Requirement 1: User Onboarding and Goal Setting

**User Story:** As a new user, I want to define my personal goal in a simple sentence during onboarding, so that the app can understand what I'm trying to achieve and categorize locations accordingly.

#### Acceptance Criteria

1. WHEN a user opens the app for the first time THEN the system SHALL present an onboarding flow
2. WHEN the user reaches the goal-setting step THEN the system SHALL provide a text input field for entering their goal in natural language
3. WHEN the user enters a goal statement THEN the system SHALL validate that the input is not empty and contains meaningful content
4. WHEN the user completes goal entry THEN the system SHALL store the goal statement securely in the user's profile
5. IF the user wants to modify their goal later THEN the system SHALL provide access to edit their goal statement in settings

### Requirement 2: Location Discovery and Categorization

**User Story:** As a user with a defined goal, I want the app to automatically discover and categorize nearby businesses and locations based on how well they align with my objective, so that I can make informed decisions about where to go.

#### Acceptance Criteria

1. WHEN the app has location permission THEN the system SHALL continuously monitor the user's current location
2. WHEN the user's location changes significantly THEN the system SHALL query for nearby businesses and points of interest
3. WHEN new locations are discovered THEN the system SHALL use AI to analyze each location against the user's goal statement
4. WHEN analyzing locations THEN the system SHALL assign point values (positive, negative, or neutral) based on goal alignment
5. WHEN location data is processed THEN the system SHALL store the categorized locations with their point values
6. IF location data is unavailable or incomplete THEN the system SHALL integrate with Google Search API to gather additional business information

### Requirement 3: Passive Location Tracking and Point Calculation

**User Story:** As a user going about my daily activities, I want the app to automatically track when I visit categorized locations and calculate points based on my goal alignment, so that I can see how well I'm adhering to my objectives without manual input.

#### Acceptance Criteria

1. WHEN the user enters a geofenced area around a categorized location THEN the system SHALL detect the visit automatically
2. WHEN a location visit is detected THEN the system SHALL record the timestamp, location details, and duration of visit
3. WHEN recording a visit THEN the system SHALL calculate points based on the pre-assigned location value
4. WHEN points are calculated THEN the system SHALL add them to the user's daily point total
5. WHEN tracking visits THEN the system SHALL maintain a history of all location visits with associated point values

### Requirement 4: Proactive Notifications and Bonus Points

**User Story:** As a user near a positively-rated location, I want to receive proactive notifications with bonus point opportunities, so that I'm encouraged to make goal-aligned choices in real-time.

#### Acceptance Criteria

1. WHEN the user is within proximity of a positively-rated location THEN the system SHALL send a push notification
2. WHEN sending proactive notifications THEN the system SHALL offer a time-limited bonus point multiplier (2x points)
3. WHEN the user visits the location within the bonus timeframe THEN the system SHALL apply the multiplier to earned points
4. WHEN the bonus timeframe expires THEN the system SHALL revert to standard point values
5. IF the user has notification preferences set THEN the system SHALL respect their notification frequency and timing settings

### Requirement 5: Daily Summary and Progress Tracking

**User Story:** As a user at the end of each day, I want to see a comprehensive summary of my activities, points earned, and locations visited, so that I can reflect on my progress toward my goal.

#### Acceptance Criteria

1. WHEN the day ends (configurable time) THEN the system SHALL generate a daily summary report
2. WHEN creating the summary THEN the system SHALL include total points earned, locations visited, and goal alignment percentage
3. WHEN displaying the summary THEN the system SHALL show both positive and negative point activities with explanations
4. WHEN presenting daily data THEN the system SHALL provide visual representations of progress and trends
5. WHEN the user views their summary THEN the system SHALL allow them to add notes or reflections about their day

### Requirement 6: Location Data Management and Privacy

**User Story:** As a privacy-conscious user, I want my location data to be handled securely and have control over what information is stored and shared, so that I can use the app with confidence.

#### Acceptance Criteria

1. WHEN requesting location permissions THEN the system SHALL clearly explain why location access is needed
2. WHEN storing location data THEN the system SHALL encrypt sensitive information and follow data protection best practices
3. WHEN processing location information THEN the system SHALL only retain data necessary for app functionality
4. WHEN the user wants to delete their data THEN the system SHALL provide options to clear location history
5. IF the user revokes location permissions THEN the system SHALL gracefully handle the limitation and inform the user of reduced functionality

### Requirement 7: AI Integration and Goal Interpretation

**User Story:** As a user with diverse and potentially complex goals, I want the AI system to accurately understand and interpret my objectives to properly categorize locations, so that the point assignments truly reflect my intentions.

#### Acceptance Criteria

1. WHEN processing a user's goal statement THEN the system SHALL use AI to extract key themes and criteria
2. WHEN evaluating locations THEN the system SHALL consider multiple factors including business type, reviews, and contextual information
3. WHEN AI analysis is uncertain THEN the system SHALL assign neutral points and flag for potential user feedback
4. WHEN categorizing locations THEN the system SHALL provide transparency about why certain point values were assigned
5. IF the AI model is updated THEN the system SHALL re-evaluate existing location categorizations for consistency

### Requirement 8: Dynamic Point System and User Overrides

**User Story:** As a user who may disagree with AI categorizations, I want to manually override point assignments and have a flexible point system that adapts to goal alignment strength, so that the app accurately reflects my personal judgment and goal complexity.

#### Acceptance Criteria

1. WHEN the AI assigns point values THEN the system SHALL use dynamic scoring based on goal alignment strength rather than fixed ranges
2. WHEN a user views a location's categorization THEN the system SHALL display the reasoning behind the point assignment
3. WHEN a user disagrees with a categorization THEN the system SHALL allow manual override of point values
4. WHEN a user overrides a categorization THEN the system SHALL learn from this feedback to improve future AI decisions
5. WHEN determining location discovery radius THEN the system SHALL adapt based on population density (smaller radius in cities, larger in rural areas)

### Requirement 9: Visit Detection and Offline Functionality

**User Story:** As a user who may have limited connectivity, I want the app to work offline and accurately detect when I've actually visited a location rather than just passed by, so that my points reflect genuine engagement with goal-aligned places.

#### Acceptance Criteria

1. WHEN detecting location visits THEN the system SHALL use multiple criteria: time spent in proximity, proximity threshold, and optional manual check-in
2. WHEN the user spends significant time at a location THEN the system SHALL automatically register a visit
3. WHEN connectivity is unavailable THEN the system SHALL cache location data and sync when connection is restored
4. WHEN operating offline THEN the system SHALL continue tracking visits using cached location categorizations
5. WHEN manual check-in is available THEN the system SHALL allow users to confirm visits for bonus accuracy points

### Requirement 10: Multiplayer Goals and Social Features

**User Story:** As a user who wants to share accountability with friends or family, I want to join shared goals with others and compete on leaderboards, so that I can benefit from social motivation and friendly competition.

#### Acceptance Criteria

1. WHEN creating or joining a goal THEN the system SHALL support both individual and shared group goals
2. WHEN multiple users share a goal THEN the system SHALL maintain a real-time leaderboard showing relative progress
3. WHEN a group member achieves something significant THEN the system SHALL notify other group members
4. WHEN displaying group progress THEN the system SHALL show individual contributions while maintaining privacy of specific locations
5. WHEN users are in a shared goal THEN the system SHALL provide group challenges and collaborative achievements

### Requirement 11: Gamification and Social Notifications

**User Story:** As a user in a competitive group setting, I want to receive notifications about others' activities and achievements, so that I stay engaged and motivated through social dynamics.

#### Acceptance Criteria

1. WHEN a group member earns significant points THEN the system SHALL send achievement notifications to other members
2. WHEN someone is actively earning points THEN the system SHALL provide real-time activity indicators to group members
3. WHEN group milestones are reached THEN the system SHALL celebrate collective achievements
4. WHEN users prefer reduced notifications THEN the system SHALL provide granular notification controls
5. WHEN displaying social activities THEN the system SHALL respect user privacy preferences for sharing location details vs general activity

### Requirement 12: Group Discovery and Management

**User Story:** As a user wanting to join others with similar goals, I want to discover public shared goals and create private groups, so that I can find the right accountability community for my objectives.

#### Acceptance Criteria

1. WHEN browsing for groups THEN the system SHALL display a list of public shared goals that users can join
2. WHEN creating a group THEN the system SHALL allow users to make goals either public or private by invitation only
3. WHEN joining a shared goal THEN the system SHALL ensure all group members use identical point value assignments for fairness
4. WHEN managing groups THEN the system SHALL provide admin controls for group creators to manage membership
5. WHEN users search for groups THEN the system SHALL allow filtering by goal type, activity level, and group size

### Requirement 13: Comprehensive Leaderboards and Time Tracking

**User Story:** As a competitive user, I want to see real-time leaderboards across multiple timeframes, so that I can track both immediate progress and long-term consistency.

#### Acceptance Criteria

1. WHEN viewing leaderboards THEN the system SHALL display real-time rankings that update as points are earned
2. WHEN accessing leaderboard data THEN the system SHALL provide daily, weekly, monthly, and all-time views
3. WHEN calculating rankings THEN the system SHALL handle ties appropriately and show recent activity trends
4. WHEN displaying leaderboard information THEN the system SHALL show point totals and activity streaks
5. WHEN users achieve ranking milestones THEN the system SHALL provide celebratory feedback and notifications

### Requirement 14: Privacy Controls and Notification Timing

**User Story:** As a privacy-conscious user in group settings, I want granular control over what information I share and when notifications are sent, so that I can participate in social accountability without compromising my privacy or being tracked in real-time.

#### Acceptance Criteria

1. WHEN configuring privacy settings THEN the system SHALL allow users to choose what information is visible to group members
2. WHEN sharing activity THEN the system SHALL support options from point totals only to specific location details based on user preference
3. WHEN sending notifications THEN the system SHALL allow users to set time delays to prevent real-time location tracking
4. WHEN managing notification preferences THEN the system SHALL provide granular controls for different types of social notifications
5. WHEN privacy settings change THEN the system SHALL immediately apply new preferences to all group interactions

### Requirement 15: Gamification Elements and Achievement System

**User Story:** As a user motivated by achievement and progress tracking, I want comprehensive gamification features including streaks, badges, and challenges, so that I stay engaged and motivated to pursue my goals consistently.

#### Acceptance Criteria

1. WHEN users maintain consistent goal-aligned behavior THEN the system SHALL track and display streak counters
2. WHEN users achieve significant milestones THEN the system SHALL award badges and achievements
3. WHEN creating engagement opportunities THEN the system SHALL generate periodic challenges for individuals and groups
4. WHEN displaying progress THEN the system SHALL use visual indicators like progress bars, level systems, and achievement galleries
5. WHEN users break streaks or face setbacks THEN the system SHALL provide encouraging feedback and recovery challenges