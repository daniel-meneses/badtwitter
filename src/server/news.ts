import express from 'express'
import { mapKeys } from 'lodash';
import moment from 'moment';
import { NewsArticle } from '../types/common';
const router = express.Router()

const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

type ogArticle = {
  _id: string,
  ogAuthor: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterImage: string;
  ogUrl: string;
  ogDate: string;
  ogSiteName: string;
  tag: string;
}

const formatArticle = (article : ogArticle): NewsArticle => {
  const {
    _id: id,
    ogAuthor,
    ogTitle: title,
    ogDescription: description,
    ogImage: imageLarge,
    twitterImage: imageSmall,
    ogUrl: url,
    ogDate: ogDate,
    ogSiteName,
    tag,
  } = article
  const formattedDate = moment(ogDate).fromNow(false);
  const date = formattedDate === 'a few seconds ago' ? 'today' : capitalizeFirstLetter(formattedDate);
  const author = ogAuthor || ogSiteName || ''

  return { 
    id, 
    author: author.toUpperCase(), 
    title: title || '', 
    description: description || '', 
    imageLarge: imageLarge || '', 
    imageSmall: imageSmall || '', 
    url, 
    date, 
    tag: capitalizeFirstLetter(tag) 
  }
}

var formatToObject = (arr: any[]) =>
  mapKeys(arr, "id");

router.get('/article/:id', function (req, res, next) {
  const id = req.params.id
  req.dbStoryPreviews
    .findOne({ _id: { $eq: id } })
    .then( (a: ogArticle) => {
      res.json({ articles: formatToObject([formatArticle(a)]) })
    })
  }
)


router.get('/:type', function (req, res, next) {
  const type = req.params.type
  const page = parseInt(req.query.page as string)
  const limit = parseInt(req.query.limit as string)
  req.dbStoryPreviews
    .find({ tag: { $eq: type } })
    .skip(page > 0 ? ((page - 1) * limit) : 0)
    .limit(limit)
    .sort({ ogDate: 1 })
    .toArray()
    .then( (r: ogArticle[]) =>
      res.json({ 
        articles: formatToObject( r.map(a => formatArticle(a) ) )
      })
    )}
)

export default router