import { gql, useQuery } from '@apollo/client'

export const useFindProduct = (_id) => {

  const FIND_PRODUCT = gql`
    query($_id: String!)  {
      findProduct(_id: $_id) {
        _id
        name
        category
        price
        discountedPrice
        model
        features
        models {
          type
          variants {
            _id
            model
          }
        }
        images {
          smallImg
          largeImg
    }
      }
    }
    `

  const { data, loading } = useQuery(FIND_PRODUCT, { variables: { _id: _id } })

  return { data, loading }

}