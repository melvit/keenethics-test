import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from 'next/link';
import _ from 'lodash';
import Moment from 'react-moment';

/**
 * Convert blog-post/portfolio-item to same scheme:
 * {
 *  title,
 *  description,
 *  imgUrl,
 *  tags,
 *  url,
 *  asUrl,
 *  publishDate,
 * }
 * @param {} item data object
 */
const getDataFromProperty = (item) => {
  // check if we got portfolio item
  if (!item.file && !item.slug && item.category) {
    return {
      title: item.title,
      description: item.description,
      imgUrl: `/static/portfolio/${item.imgSrc}`,
      url: item.href,
      asUrl: item.href,
      tags: item.category.main,
      publishDate: null,
    };
  }

  // check blog post
  if (item.slug && item.heroImage.fields.file) {
    return {
      title: item.title,
      description: null,
      imgUrl: `https://${
        _.get(item.heroImage, 'fields.file.url')
      }?fm=jpg&fl=progressive&q=85&w=350`,
      url: `/post?name=${item.slug}`,
      asUrl: `/blog/${item.slug}`,
      tags: item.categories,
      publishDate: item.publishDate,
    };
  }

  throw new Error('Wrong item object supplied.');
};

const ListItem = ({ work, rounded }) => {
  const {
    title,
    // description,
    imgUrl,
    url,
    asUrl,
    tags,
    publishDate,
  } = getDataFromProperty(work);

  return (
    <div className={classNames('page__item', { '-rounded': rounded })}>
      <Link href={url} as={asUrl}>
        <a className="page__item-link">
          <figure className="page__item-figure">
            <div className="page__item-figure-img-wrap">
              <img src={imgUrl} alt={title} className="page__item-img" />
            </div>
            <figcaption className="page__item-figcaption">
              <div className="page__item-figcaption-heading">
                <ul className="page__item-tags">
                  {
                    tags.length !== 0
                      ? tags.map((category) => (<li className="page__item-tag" key={category}>{category}</li>))
                      : null
                  }
                </ul>
                {
                  publishDate
                  && (
                    <Moment
                      format="MMM DD, YYYY"
                      className="page__item-date"
                    >
                      {new Date(publishDate)}
                    </Moment>
                  )
                }
              </div>
              <h3 className="page__item-title">{title}</h3>
            </figcaption>
          </figure>
        </a>
      </Link>
    </div>
  );
};

ListItem.propTypes = {
  rounded: PropTypes.bool,
  work: PropTypes.shape({
    href: PropTypes.string,
    imgSrc: PropTypes.string,
    title: PropTypes.string,
    category: PropTypes.object,
    slug: PropTypes.string,
  }).isRequired,
};

ListItem.defaultProps = {
  rounded: false,
};

export default ListItem;
