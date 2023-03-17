// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

contract Approve {

    mapping(address => mapping(address => uint256)) private _allowances;
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    event Approval(address indexed owner, address indexed spender, uint256 value);

    function isApprovedForAll(address owner, address operator) public view virtual returns (bool) {
        return _operatorApprovals[owner][operator];
    }

    function _isApprovedOrOwner(address spender) internal view virtual returns (bool) {
        address owner = msg.sender;
        return (spender == owner || isApprovedForAll(owner, spender));
    }

    function _approve(
        address owner,
        address spender,
        uint256 amount
    ) internal virtual {
        require(owner != address(0), "approve from the zero address");
        require(spender != address(0), " approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    function allowance(address owner, address spender) public view virtual returns (uint256) {
        return _allowances[owner][spender];
    }

    function spendAllowance(
        address owner,
        address spender,
        uint256 amount
    ) public virtual {
        uint256 currentAllowance = allowance(owner, spender);
        if (currentAllowance != type(uint256).max) {
            require(currentAllowance >= amount, "ERC20: insufficient allowance");
            unchecked {
                _approve(owner, spender, currentAllowance - amount);
            }
        }
    }

   

}
