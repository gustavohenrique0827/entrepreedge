
import React from 'react';
import FeedbackForm from './FeedbackForm';
import PartnerLinks from './PartnerLinks';
import SegmentConsulting from './SegmentConsulting';

const SuggestionSection = () => {
  return (
    <div className="space-y-6">
      <FeedbackForm />
      <PartnerLinks />
      <SegmentConsulting />
    </div>
  );
};

export default SuggestionSection;
