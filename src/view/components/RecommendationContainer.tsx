import { RecommendationDto } from '@thornbill/jellyfin-sdk/dist/generated-client';
import React, { FunctionComponent } from 'react';

import globalize from '../../scripts/globalize';
import escapeHTML from 'escape-html';
import SectionContainer from './SectionContainer';

type RecommendationContainerProps = {
    getPortraitShape: () => string;
    enableScrollX: () => boolean;
    recommendation?: RecommendationDto;
}

const RecommendationContainer: FunctionComponent<RecommendationContainerProps> = ({ getPortraitShape, enableScrollX, recommendation = {} }: RecommendationContainerProps) => {
    let title = '';

    switch (recommendation.RecommendationType) {
        case 'SimilarToRecentlyPlayed':
            title = globalize.translate('RecommendationBecauseYouWatched', recommendation.BaselineItemName);
            break;

        case 'SimilarToLikedItem':
            title = globalize.translate('RecommendationBecauseYouLike', recommendation.BaselineItemName);
            break;

        case 'HasDirectorFromRecentlyPlayed':
        case 'HasLikedDirector':
            title = globalize.translate('RecommendationDirectedBy', recommendation.BaselineItemName);
            break;

        case 'HasActorFromRecentlyPlayed':
        case 'HasLikedActor':
            title = globalize.translate('RecommendationStarring', recommendation.BaselineItemName);
            break;
    }

    return <SectionContainer
        sectionTitle={escapeHTML(title)}
        enableScrollX={enableScrollX}
        items={recommendation.Items || []}
        cardOptions={{
            shape: getPortraitShape(),
            showYear: true
        }}
    />;
};

export default RecommendationContainer;
