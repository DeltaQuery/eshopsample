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
    images {
      smallImg
      largeImg
    }
      }
    }
    `

  const result = useQuery(FIND_PRODUCT, { variables: { _id: _id } })

  return result

}